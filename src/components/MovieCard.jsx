import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie: { id, title, vote_average, release_date, poster_path, original_language } }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="movie-card hover:brightness-75 transition duration-300 ease-in-out transform hover:scale-105">
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
          alt={title}
        />
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="star.svg" alt="star icon" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
