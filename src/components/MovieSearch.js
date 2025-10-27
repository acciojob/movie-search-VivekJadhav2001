import React, { useState } from "react";

function MovieSearch() {
  const [movieInput, setMovieInput] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState("");

  const API = "https://www.omdbapi.com/?apikey=99eb9fd1&s=";

  async function getMovies(e) {
    e.preventDefault();
    if (!movieInput.trim()) return;

    try {
      const res = await fetch(`${API}${movieInput}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovieData(data.Search);
        setError("");
      } else {
        setMovieData([]);
        setError("Invalid movie name. Please try again.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      setError("Something went wrong. Try again later.");
    }
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen w-screen">
      <form onSubmit={getMovies} className="mb-6">
        <label
          htmlFor="movieInput"
          className="block mb-2 text-lg font-semibold"
        >
          Search Movie
        </label>
        <input
          type="text"
          id="movieInput"
          className="border-2 border-white text-white px-3 py-2 rounded-lg mr-3"
          value={movieInput}
          onChange={(e) => setMovieInput(e.target.value)}
          placeholder="Enter movie name..."
        />
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          Search
        </button>
      </form>

      {error && <p className="error text-red-500 text-lg">{error}</p>}

      <div className="displayMovie">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <li
              key={movie.imdbID}
              className="bg-gray-800 p-3 rounded-lg shadow-md"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="mt-2 text-xl font-bold">{movie.Title}</h2>
              <p className="text-gray-400">{movie.Year}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieSearch;
