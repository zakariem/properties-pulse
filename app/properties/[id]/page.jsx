"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchSingleProperty } from "@/utils/requests";

function Property() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchProperyData = async () => {
      if (!id) return;
      try {
        const property = await fetchSingleProperty(id);
        setProperty(property);
      } catch (e) {
        console.log("====================================");
        console.error("Error fetching property ", e);
        console.log("====================================");
      } finally {
        setLoading(false);
      }
    };
    if (property === null) fetchProperyData();
  }, [id, property]);
  return <div>hi</div>;
}

export default Property;
