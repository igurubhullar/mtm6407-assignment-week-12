import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchReview } from "@/lib/api";

async function getReview(id) {
  try {
    return await fetchReview(id);
  } catch (error) {
    console.error("Error fetching review:", error);
    return null;
  }
}

export default async function ReviewDetailPage({ params }) {
  const review = await getReview(params.id);

  if (!review || !review.id) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/reviews"
          className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to reviews
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <div className="relative h-80 md:h-full w-full">
              {review.poster !== "N/A" ? (
                <Image
                  src={review.poster}
                  alt={`${review.title} poster`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                  No poster available
                </div>
              )}
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {review.title}
              </h1>
              <div className="bg-yellow-500 text-black font-bold rounded-full px-3 py-1 text-sm">
                ★ {review.rating}/10
              </div>
            </div>

            <p className="text-gray-400 mb-4">
              {review.year} • Directed by {review.director}
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-yellow-500">
                Plot
              </h2>
              <p className="text-gray-300">{review.plot}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-yellow-500">
            Our Review
          </h2>
          <div className="prose prose-invert prose-yellow max-w-none">
            <p className="text-gray-300 whitespace-pre-line">
              {review.reviewContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
