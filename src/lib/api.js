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
 * Fetch movies with proper URL handling for both server and client components
 */
export async function fetchMovies(query = "") {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/movies${
    query ? `?query=${encodeURIComponent(query)}` : ""
  }`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch single movie with proper URL handling for both server and client components
 */
export async function fetchMovie(id) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/movies?id=${id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
