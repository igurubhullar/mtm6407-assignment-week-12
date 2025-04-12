"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/lib/api";

// Loading component for the Suspense fallback
function MoviesLoading() {
  return (
    <div className="flex justify-center my-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );
}

// Client component that uses useSearchParams
function MoviesContent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const data = await fetchMovies(query);
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Movie Reviews</h1>

      <div className="mb-8">
        <SearchBar initialQuery={query} />
      </div>

      {query && (
        <div className="mb-6 text-gray-300">
          {movies.length > 0
            ? `Found ${movies.length} results for "${query}"`
            : `No results found for "${query}"`}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4 bg-red-900/20 rounded-lg">
          {error}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-4">No movies found</p>
          <p>Try searching for a different movie</p>
        </div>
      )}
    </div>
  );
}

// Main component with Suspense boundary
export default function MoviesPage() {
  return (
    <Suspense fallback={<MoviesLoading />}>
      <MoviesContent />
    </Suspense>
  );
}
