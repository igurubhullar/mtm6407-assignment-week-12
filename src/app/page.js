import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/lib/api";

async function getPopularMovies() {
  try {
    return await fetchMovies();
  } catch (error) {
    console.error("Error loading movies:", error);
    return [];
  }
}

export default async function Home() {
  const movies = await getPopularMovies();
  const featuredMovies = movies.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">CineCritic</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover honest and insightful movie reviews from our expert critics
        </p>

        <div className="mb-12">
          <SearchBar />
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-800 pb-2">
          Featured Movies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg h-full">
                <div className="relative h-64 w-full">
                  {movie.poster !== "N/A" ? (
                    <Image
                      src={movie.poster}
                      alt={`${movie.title} poster`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-opacity duration-300 group-hover:opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                      No poster available
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full px-2 py-1 text-xs">
                    ★ {movie.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-yellow-400 transition-colors">
                    {movie.title} ({movie.year})
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">{movie.excerpt}</p>
                  <div className="text-yellow-500 text-sm font-semibold">
                    Read movie →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/movies"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition-colors"
          >
            View All Movies
          </Link>
        </div>
      </section>
    </div>
  );
}
