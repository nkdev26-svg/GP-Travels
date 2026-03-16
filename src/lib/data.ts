import { Tour, Testimonial } from "@/types";

export const TOURS: Tour[] = [
    {
        id: "1",
        title: "Alpine Adventure",
        description: "Experience the breathtaking beauty of the Swiss Alps with our guided trekking tour. Perfect for nature lovers.",
        destination: "Switzerland",
        image: "/placeholder-tour.jpg",
        price: "₹1,200",
        duration: "7 Days",
        featured: true,
    },
    {
        id: "2",
        title: "Tropical Paradise",
        description: "Relax on the pristine beaches of Bali and explore vibrant local markets and ancient temples.",
        destination: "Bali, Indonesia",
        image: "/placeholder-tour.jpg",
        price: "₹850",
        duration: "5 Days",
        featured: true,
    },
    {
        id: "3",
        title: "Safari Expedition",
        description: "Witness the majestic wildlife of the Serengeti in this once-in-a-lifetime safari experience.",
        destination: "Tanzania",
        image: "/placeholder-tour.jpg",
        price: "₹2,500",
        duration: "10 Days",
        featured: true,
    },
    {
        id: "4",
        title: "Historic Rome",
        description: "Walk through history as you visit the Colosseum, Vatican, and other ancient landmarks of Rome.",
        destination: "Italy",
        image: "/placeholder-tour.jpg",
        price: "Contact for Price",
        duration: "4 Days",
    },
    {
        id: "5",
        title: "Tokyo Lights",
        description: "Discover the perfect blend of tradition and future in the vibrant streets of Tokyo.",
        destination: "Japan",
        image: "/placeholder-tour.jpg",
        price: "₹1,400",
        duration: "6 Days",
    },
    {
        id: "6",
        title: "Santorini Sunset",
        description: "Enjoy the iconic blue domes and stunning sunsets in one of Greece's most beautiful islands.",
        destination: "Greece",
        image: "/placeholder-tour.jpg",
        price: "₹1,100",
        duration: "5 Days",
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        name: "John Doe",
        role: "Adventure Enthusiast",
        content: "The Swiss Alps tour was absolutely incredible. The guides were professional and the views were unmatched!",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "2",
        name: "Sarah Smith",
        role: "Solo Traveler",
        content: "I felt so safe and well-taken care of during my trip to Bali. Highly recommend this agency for solo travelers.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    },
];

export const CONTACT_INFO = {
    phone: "+919876543210",
    whatsapp: "919876543210",
    email: "info@gptravels.com",
    address: "123 Travel Lane, Adventure City, World",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.012543202!2d77.2090212!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204d!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};
