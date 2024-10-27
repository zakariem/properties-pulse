import { connectDB } from "@/config/db";
import Property from "@/model/Property";
import getSessionUserID from "@/utils/getSessionUserID";

// Get /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const session = await getSessionUserID();

    if (!session || !session.userId) {
      return new Response(
        JSON.stringify({ error: "You must be logged in to create a property" }),
        { status: 401 }
      );
    }

    const { userId } = session;
    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      // images,
    };

    const newProperty = await Property(propertyData);
    await newProperty.save();

    return new Response(null, {
      status: 303,
      headers: {
        Location: `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${newProperty._id}`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

