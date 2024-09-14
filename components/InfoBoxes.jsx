import React from "react";
import InfoBox from "./InfoBox";

function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-100"
            textColor="text-black"
            buttonInfo={{
              info: "properties.html",
              text: "Browse Properties",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>

          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            textColor="text-black"
            buttonInfo={{
              info: "add-property.html",
              text: "Add Property",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an Airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;
