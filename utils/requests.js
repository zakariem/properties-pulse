const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

if (!apiDomain) {
  console.error("API domain environment variable is missing.");
}

async function handleFetch(url) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null; // Return `null` or `[]` based on context
  }
}

export async function fetchProperties() {
  if (!apiDomain) return [];
  return await handleFetch(`${apiDomain}/properties`) || [];
}

export async function fetchSingleProperty(id) {
  if (!apiDomain) return null;
  return await handleFetch(`${apiDomain}/properties/${id}`);
}
