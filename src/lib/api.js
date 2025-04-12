/**
 * Helper function to get the base URL for API requests
 * Works in both server and client components
 */
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative URL
    return "";
  }

  // Server should use absolute URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback for local development
  return "http://localhost:3000";
}

/**
 * Fetch reviews with proper URL handling for both server and client components
 */
export async function fetchReviews(query = "") {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/reviews${
    query ? `?query=${encodeURIComponent(query)}` : ""
  }`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch single review with proper URL handling for both server and client components
 */
export async function fetchReview(id) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/reviews?id=${id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
