"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { z } from "zod";
import crypto from "crypto";
import { sendResetEmail } from "./notifications";
import { supabase } from "./supabase";

// --- Validation Schemas ---

const TourSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    destination: z.string().min(2, "Destination is required"),
    price: z.string().min(1, "Price is required"),
    duration: z.string().min(1, "Duration is required"),
    featured: z.boolean().default(false),
});

const InquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    message: z.string().min(2, "Message must be at least 2 characters"),
});

const TestimonialSchema = z.object({
    name: z.string().min(2, "Name is required"),
    role: z.string().min(2, "Role is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    rating: z.number().min(1).max(5).default(5),
});

const CarSchema = z.object({
    name: z.string().min(2, "Car name is required"),
    details: z.string().min(10, "Details must be at least 10 characters"),
    hourlyPrice: z.string().optional().nullable(),
});

// --- Helper Functions ---

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("Unauthorized: Please login to perform this action");
    }
    return session;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

async function saveFile(file: File): Promise<string> {
    // Security: Validate file type and size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds 5MB limit");
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        throw new Error("Only .jpg, .png and .webp formats are supported");
    }

    // --- Production Fix: Supabase Storage Support ---
    // Using Supabase for free cloud storage instead of Cloudinary or local disk.
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const filename = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "-")}`;
            const { data, error } = await supabase.storage
                .from("uploads")
                .upload(filename, buffer, {
                    contentType: file.type,
                    upsert: true
                });

            if (error) throw error;

            // Get the public URL for the uploaded file
            const { data: { publicUrl } } = supabase.storage
                .from("uploads")
                .getPublicUrl(filename);

            return publicUrl;
        } catch (error) {
            console.error("Supabase upload failed, falling back to local:", error);
        }
    }

    // Fallback/Local Development: Save to public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "uploads");

    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) { /* ignore */ }

    const filename = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "-")}`;
    const path = join(uploadDir, filename);

    await writeFile(path, buffer);
    return `/uploads/${filename}`;
}

// --- Server Actions ---

export async function createTour(formData: FormData) {
    await checkAuth();

    const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        destination: formData.get("destination") as string,
        price: formData.get("price") as string,
        duration: formData.get("duration") as string,
        featured: formData.get("featured") === "on",
    };

    // Validate
    const validated = TourSchema.parse(data);

    let imageUrl = formData.get("image-url") as string;
    const imageFile = formData.get("image-file") as File;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await saveFile(imageFile);
    }

    await prisma.tour.create({
        data: {
            ...validated,
            image: imageUrl || "/placeholder-tour.jpg",
        },
    });

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    revalidatePath("/");
    redirect("/admin/tours");
}

export async function updateTour(id: string, formData: FormData) {
    await checkAuth();

    const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        destination: formData.get("destination") as string,
        price: formData.get("price") as string,
        duration: formData.get("duration") as string,
        featured: formData.get("featured") === "on",
    };

    const validated = TourSchema.parse(data);

    let imageUrl = formData.get("image-url") as string;
    const imageFile = formData.get("image-file") as File;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await saveFile(imageFile);
    }

    // If no new image was provided (either file or URL), we keep the old one
    const updateData: any = { ...validated };
    if (imageUrl) {
        updateData.image = imageUrl;
    }

    await prisma.tour.update({
        where: { id },
        data: updateData,
    });

    revalidatePath("/admin/tours");
    revalidatePath(`/admin/tours/${id}`);
    revalidatePath("/tours");
    revalidatePath("/");
    redirect("/admin/tours");
}

export async function deleteTour(id: string) {
    await checkAuth();
    await prisma.tour.delete({
        where: { id },
    });
    await logAdminAction("Delete Tour", { id });
    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    revalidatePath("/");
}

export async function createInquiry(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
    };

    const result = InquirySchema.safeParse(data);
    
    if (!result.success) {
        return { success: false, error: result.error.issues[0].message };
    }

    try {
        await prisma.inquiry.create({
            data: result.data,
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (e) {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}

export async function logContactClick(type: 'whatsapp' | 'phone', location: string = 'website') {
    await prisma.inquiry.create({
        data: {
            name: "Direct Click",
            phone: type === 'whatsapp' ? "WhatsApp Link" : "Phone Link",
            message: `User clicked the ${type} link from ${location}`,
            status: "clicked", // special status to differentiate from form submissions
        }
    });
    revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
    await checkAuth();
    await prisma.inquiry.delete({
        where: { id },
    });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
}

export async function updateSiteSettings(settings: Record<string, string>) {
    await checkAuth();

    const promises = Object.entries(settings).map(([key, value]) =>
        prisma.siteSettings.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        })
    );
    await Promise.all(promises);
    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/layout");
}

export async function createTestimonial(formData: FormData) {
    await checkAuth();

    const data = {
        name: formData.get("name") as string,
        role: formData.get("role") as string,
        content: formData.get("content") as string,
        rating: parseInt(formData.get("rating") as string) || 5,
    };

    const validated = TestimonialSchema.parse(data);

    let imageUrl = formData.get("image-url") as string;
    const imageFile = formData.get("image-file") as File;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await saveFile(imageFile);
    }

    await prisma.testimonial.create({
        data: {
            ...validated,
            image: imageUrl || "/placeholder-avatar.jpg"
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
    await checkAuth();

    await prisma.testimonial.delete({
        where: { id }
    });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}

export async function logAdminAction(action: string, details: Record<string, any>) {
    console.log(`[ADMIN ACTION] ${action}`, details);
    // Optionally, save logs to a database or external logging service
}

// --- Car Actions ---

export async function createCar(formData: FormData) {
    await checkAuth();

    const data = {
        name: formData.get("name") as string,
        details: formData.get("details") as string,
        hourlyPrice: formData.get("hourly-price") as string || null,
    };

    const validated = CarSchema.parse(data);

    let imageUrl = formData.get("image-url") as string;
    const imageFile = formData.get("image-file") as File;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await saveFile(imageFile);
    }

    await prisma.car.create({
        data: {
            ...validated,
            image: imageUrl || "/placeholder-car.jpg",
        },
    });

    revalidatePath("/admin/cars");
    revalidatePath("/cars");
    revalidatePath("/");
    redirect("/admin/cars");
}

export async function updateCar(id: string, formData: FormData) {
    await checkAuth();

    const data = {
        name: formData.get("name") as string,
        details: formData.get("details") as string,
        hourlyPrice: formData.get("hourly-price") as string || null,
    };

    const validated = CarSchema.parse(data);

    let imageUrl = formData.get("image-url") as string;
    const imageFile = formData.get("image-file") as File;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await saveFile(imageFile);
    }

    const updateData: any = { ...validated };
    if (imageUrl) {
        updateData.image = imageUrl;
    }

    await prisma.car.update({
        where: { id },
        data: updateData,
    });

    revalidatePath("/admin/cars");
    revalidatePath("/cars");
    revalidatePath("/");
    redirect("/admin/cars");
}

export async function deleteCar(id: string) {
    await checkAuth();
    await prisma.car.delete({
        where: { id },
    });
    await logAdminAction("Delete Car", { id });
    revalidatePath("/admin/cars");
    revalidatePath("/cars");
    revalidatePath("/");
}

// --- Password Reset Actions ---

export async function requestPasswordReset(formData: FormData) {
    const identifier = formData.get("identifier") as string; // Email or Username

    if (!identifier) throw new Error("Please enter your email or username");

    // 1. Check if user is registered (Admin Registration First logic)
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: identifier },
                { username: identifier }
            ]
        }
    });

    if (!user) {
        // For security, don't reveal if user exists. Just say "Check your inbox"
        return { success: true };
    }

    // 2. Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
        data: {
            token,
            userId: user.id,
            expiresAt
        }
    });

    // 3. Send notification
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
    
    // Send to Email (Free via Gmail)
    await sendResetEmail(user.email, resetUrl);

    return { success: true };
}

export async function resetPassword(formData: FormData) {
    const token = formData.get("token") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (password.length < 8) throw new Error("Password must be at least 8 characters");

    // 1. Verify token
    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token }
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
        throw new Error("Invalid or expired reset link. Please request a new one.");
    }

    // 2. Update user password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword }
    });

    // 3. Cleanup token
    await prisma.passwordResetToken.delete({
        where: { id: resetToken.id }
    });

    return { success: true };
}

export async function registerAdmin(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const registrationKey = formData.get("registrationKey") as string;

    // Security: Verify registration key
    const serverKey = process.env.ADMIN_REGISTRATION_KEY || "tourkey123";
    if (registrationKey !== serverKey) {
        throw new Error("Invalid Administration Key. You are not authorized to create an account.");
    }

    if (!username || !email || !password) throw new Error("All fields are required");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (password.length < 8) throw new Error("Password must be at least 8 characters");

    // Check if user already exists
    const existing = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    });

    if (existing) {
        throw new Error("Username or Email already registered");
    }

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role: "admin"
        }
    });

    return { success: true };
}
