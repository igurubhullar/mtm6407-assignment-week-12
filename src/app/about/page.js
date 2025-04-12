export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About CineCritic</h1>

      <div className="prose prose-invert prose-yellow max-w-none">
        <p className="text-lg">
          Welcome to CineCritic, your trusted source for honest and insightful
          movie reviews.
        </p>

        <p>
          At CineCritic, we believe that movies are more than just entertainment
          – they're a form of art that can inspire, challenge, and transform us.
          Our mission is to help you discover films worth your time through
          thoughtful analysis and fair criticism.
        </p>

        <h2>Our Approach</h2>
        <p>
          Every review on CineCritic is crafted with care, balancing technical
          evaluation with emotional response. We consider factors like
          storytelling, performance, direction, cinematography, and cultural
          impact when assessing a film.
        </p>

        <h2>How We Rate</h2>
        <p>
          Our rating system is based on a 10-point scale, with 10 representing a
          masterpiece and 1 indicating a film with significant flaws. We believe
          that every rating should be justified through careful analysis and
          explanation.
        </p>

        <h2>About This Project</h2>
        <p>
          This website was built as a demonstration of a headless CMS
          architecture, using Next.js for the frontend and a custom API that
          retrieves data from the OMDB API. It showcases modern web development
          techniques including responsive design, API integration, and dynamic
          content rendering.
        </p>
      </div>
    </div>
  );
}
