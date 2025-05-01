import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'https://www.omdbapi.com/?apikey=YOUR_API_KEY';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies('Batman'); // Default search
  }, []);

  return (
    <div className="app">
      <h1>🎬 Movie Finder</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') searchMovies(searchTerm);
          }}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <h2>No movies found</h2>
        )}
      </div>
    </div>
  );
};

export default App;
