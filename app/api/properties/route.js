import { connectDB } from "@/config/db";
import Property from "@/model/Property";

// Get /api/properties
export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find();

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
