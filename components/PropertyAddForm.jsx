"use client";
import { set } from "mongoose";
import { useState } from "react";

function PropertyAddForm() {
  const [fields, setFields] = useState({
    type: "Apartment",
    name: "Test Property",
    description: "",
    location: {
      street: "",
      city: "Test City",
      state: "Test State",
      zipcode: "",
    },
    beds: "3",
    baths: "2",
    square_feet: "1800",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "2000",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "test@test.com",
      phone: "",
    },
    images: [],
  });

  // Handle input change for dynamic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  // Handle amenities checkboxes
  const handleAmenities = (e) => {
    const { value, checked } = e.target;

    // clone the current state
    const updatedAmenities = [...fields.amenities];

    // if the checkbox is checked, add the value to the array
    if (checked) {
      updatedAmenities.push(value);
    } else {
      // if the checkbox is not checked, remove the value from the array
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const { files } = e.target;

    // clone the current state
    const updatedImages = [...fields.images];

    // add the selected image to the array
    for (const file of files) {
      updatedImages.push(file);
    }

    // update the state
    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  return (
    <form action="/api/properties" method="POST" encType="multipart/form-data">
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>

      {/* Property Type */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
          value={fields.type}
          onChange={handleChange}
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Listing Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          required
          value={fields.name}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your property"
          value={fields.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Location */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          value={fields.location.street}
          onChange={handleChange}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          value={fields.location.city}
          onChange={handleChange}
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          value={fields.location.state}
          onChange={handleChange}
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          value={fields.location.zipcode}
          onChange={handleChange}
        />
      </div>

      {/* Beds, Baths, Square Feet */}
      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.beds}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.baths}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.square_feet}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              className="mr-2"
              checked={fields.amenities.includes("Wifi")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full kitchen"
              className="mr-2"
              checked={fields.amenities.includes("Full kitchen")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              className="mr-2"
              checked={fields.amenities.includes("Washer & Dryer")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              className="mr-2"
              checked={fields.amenities.includes("Free Parking")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              className="mr-2"
              checked={fields.amenities.includes("Swimming Pool")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              className="mr-2"
              checked={fields.amenities.includes("Hot Tub")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              className="mr-2"
              checked={fields.amenities.includes("24/7 Security")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              className="mr-2"
              checked={fields.amenities.includes("Wheelchair Accessible")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              className="mr-2"
              checked={fields.amenities.includes("Elevator Access")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              className="mr-2"
              checked={fields.amenities.includes("Dishwasher")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              className="mr-2"
              checked={fields.amenities.includes("Gym/Fitness Center")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              className="mr-2"
              checked={fields.amenities.includes("Air Conditioning")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              className="mr-2"
              checked={fields.amenities.includes("Balcony/Patio")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              className="mr-2"
              checked={fields.amenities.includes("Smart TV")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              className="mr-2"
              checked={fields.amenities.includes("Coffee Maker")}
              onChange={handleAmenities}
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      {/* Rates */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.weekly}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.monthly}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.nightly}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Seller Information
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Seller Name"
          value={fields.seller_info.name}
          onChange={handleChange}
        />
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Seller Email"
          required
          value={fields.seller_info.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Seller Phone"
          value={fields.seller_info.phone}
          onChange={handleChange}
        />
      </div>

      {/* Images */}
      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          multiple
          onChange={handleImageChange}
          required
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add Property
      </button>
    </form>
  );
}

export default PropertyAddForm;
