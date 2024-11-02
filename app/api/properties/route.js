import { connectDB } from "@/config/db";
import Property from "@/model/Property";
import getSessionUserID from "@/utils/getSessionUserID";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

// POST /api/properties
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
    const images = formData.getAll("images").filter((image) => image.name !== "");

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
      images: [], // Initialize an array for storing image URLs
    };

    // Upload images
    const imageUploadPromises = images.map(async (image) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray).toString("base64");

      // Dynamically detect MIME type
      const mimeType = image.type || "image/png"; // Default to image/png if MIME type is unavailable
      const dataUri = `data:${mimeType};base64,${imageData}`;

      // Upload to Cloudinary and retrieve the secure_url
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "propertypulse",
      });

      // Push only the secure_url to the images array
      propertyData.images.push(result.secure_url);
    });

    // Wait for all image upload promises to complete
    await Promise.all(imageUploadPromises);

    const newProperty = new Property(propertyData);
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
