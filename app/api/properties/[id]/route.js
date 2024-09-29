import { connectDB } from "@/config/db";
import Property from "@/model/Property";

// Get single property  /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property)
      return new Response(JSON.stringify({ message: "Property Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
