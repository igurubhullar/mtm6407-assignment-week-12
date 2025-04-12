"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReviewCard from "@/components/ReviewCard";
import SearchBar from "@/components/SearchBar";
import { fetchReviews } from "@/lib/api";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const data = await fetchReviews(query);
        setReviews(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Movie Reviews</h1>

      <div className="mb-8">
        <SearchBar initialQuery={query} />
      </div>

      {query && (
        <div className="mb-6 text-gray-300">
          {reviews.length > 0
            ? `Found ${reviews.length} results for "${query}"`
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
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-4">No reviews found</p>
          <p>Try searching for a different movie</p>
        </div>
      )}
    </div>
  );
}
