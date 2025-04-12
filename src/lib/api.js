const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://mtm6407-assignment-week-12.vercel.app"
    : "http://localhost:3000";
export async function fetchMovies(query = "") {
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
  const url = `${baseUrl}/api/movies?id=${id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
