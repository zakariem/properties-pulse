import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";


const PropertyPage = async () => {
  const properties = await fetchProperties();

  properties.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-2xl text-gray-500">No properties found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyPage;
