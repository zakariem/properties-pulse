import { connectDB } from "@/config/db";

export const GET = async () => {
    try {
        await connectDB();
        return new Response(JSON.stringify({message: 'Hello World'}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}