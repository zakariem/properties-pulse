const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}