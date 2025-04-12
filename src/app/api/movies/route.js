// API route to serve as our "headless CMS" endpoint
// Will fetch movie data from OMDB API and transform it into reviews

export async function GET(request) {
  const API_KEY = "223cbf0c";
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const id = searchParams.get("id");

  try {
    let data;

    if (id) {
      // Fetch specific movie by ID
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      data = await response.json();

      if (data.Response === "False") {
        return Response.json({ error: data.Error }, { status: 404 });
      }

      // Transform into a review
      const review = {
        id: data.imdbID,
        title: data.Title,
        poster: data.Poster,
        year: data.Year,
        director: data.Director,
        plot: data.Plot,
        rating: data.imdbRating,
        reviewContent: `${data.Title} is a ${data.Year} film directed by ${data.Director}. 
          The film features ${data.Actors} and has received an IMDb rating of ${data.imdbRating}/10. 
          ${data.Plot} The film received ${data.Awards}.`,
      };

      return Response.json(review);
    } else {
      // Search for movies or return popular ones
      const searchTerm = query || "movie"; // Default search if nothing provided
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=movie`
      );
      data = await response.json();

      if (data.Response === "False") {
        return Response.json({ error: data.Error }, { status: 404 });
      }

      // Transform into reviews list
      const reviews = await Promise.all(
        data.Search.slice(0, 12).map(async (movie) => {
          // Get additional details for each movie
          const detailsResponse = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
          );
          const details = await detailsResponse.json();

          return {
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
            year: movie.Year,
            rating: details.imdbRating || "N/A",
            plot: details.Plot || "No plot available",
            excerpt: `${
              details.Plot?.substring(0, 100) || "No plot available"
            }...`,
          };
        })
      );

      return Response.json(reviews);
    }
  } catch (error) {
    console.error("Error fetching from OMDB:", error);
    return Response.json(
      { error: "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}
