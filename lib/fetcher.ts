export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  
  if (!res.ok) {
    // If response is not ok, try to return an empty array or null based on context
    // This prevents crashes when APIs return errors
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const error = await res.json().catch(() => ({}));
      console.error("API error:", error);
      // Return empty array for views API, null for others
      return (input.toString().includes("/api/views") ? [] : null) as JSON;
    }
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}
