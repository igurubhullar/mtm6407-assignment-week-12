import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const { id, title, poster, year, rating, excerpt } = movie;

  return (
    <Link href={`/movies/${id}`} className="group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 h-full flex flex-col">
        <div className="relative h-64 w-full">
          {poster !== "N/A" ? (
            <Image
              src={poster}
              alt={`${title} poster`}
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
            ★ {rating}
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{year}</p>
          <p className="text-gray-300 text-sm flex-grow">{excerpt}</p>
          <div className="mt-3 text-yellow-500 text-sm font-semibold">
            Read review →
          </div>
        </div>
      </div>
    </Link>
  );
}
