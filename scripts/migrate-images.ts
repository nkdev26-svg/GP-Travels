
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
    console.log("🚀 Starting Image Migration to Supabase...");

    // 1. Direct Upload Phase (Assuming bucket 'uploads' exists)
    const bucketName = 'uploads';
    console.log(`📡 Targeting bucket: '${bucketName}'`);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        console.log("ℹ️ No local uploads directory found. Skipping file upload migration.");
    } else {
        const files = fs.readdirSync(uploadDir);
        console.log(`📂 Found ${files.length} local files. Uploading...`);

        for (const file of files) {
            const filePath = path.join(uploadDir, file);
            if (fs.lstatSync(filePath).isDirectory()) continue;

            const fileBuffer = fs.readFileSync(filePath);
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(file, fileBuffer, {
                    contentType: 'image/' + path.extname(file).slice(1),
                    upsert: true
                });

            if (uploadError) {
                console.log(`   ❌ Failed to upload ${file}: ${uploadError.message}`);
            } else {
                console.log(`   ✅ Uploaded ${file}`);
            }
        }
    }

    // 2. Update Database Records
    console.log("\n🔄 Updating Database Records...");

    const supabaseBaseUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/`;

    // Process Tours
    const tours = await prisma.tour.findMany({
        where: { image: { startsWith: '/uploads/' } }
    });
    console.log(`📌 Found ${tours.length} tours with local image paths.`);
    for (const tour of tours) {
        const filename = tour.image.replace('/uploads/', '');
        const newUrl = supabaseBaseUrl + filename;
        await prisma.tour.update({
            where: { id: tour.id },
            data: { image: newUrl }
        });
        console.log(`   ✅ Updated Tour: ${tour.title}`);
    }

    // Process Cars
    const cars = await prisma.car.findMany({
        where: { image: { startsWith: '/uploads/' } }
    });
    console.log(`📌 Found ${cars.length} cars with local image paths.`);
    for (const car of cars) {
        const filename = car.image.replace('/uploads/', '');
        const newUrl = supabaseBaseUrl + filename;
        await prisma.car.update({
            where: { id: car.id },
            data: { image: newUrl }
        });
        console.log(`   ✅ Updated Car: ${car.name}`);
    }

    console.log("\n✨ Migration Finished!");
}

migrate()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
