export async function fetchProperties() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }
      return res.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  }