import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${id}/credits`, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movie cast');
      }
      const data = await response.json();
      setCast(data.cast.slice(0, 5)); // Fetch top 5 cast members
    } catch (error) {
      console.error('Error fetching movie cast:', error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movieDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  const {
    title,
    overview,
    poster_path,
    genres,
    vote_average,
    release_date,
    runtime,
    tagline,
    production_companies,
    original_language,
    budget,
    revenue,
    certification, // For PG status, usually comes in the "certification" field
  } = movieDetails;

  const releaseYear = release_date?.split('-')[0];
  const pgRating = certification || 'N/A'; // This will be the PG status, if available

  // Convert runtime to hours and minutes
  const runtimeInHoursAndMinutes = runtime ? `${Math.floor(runtime / 60)} hrs ${runtime % 60} min` : 'N/A';

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="container mx-auto rounded-2xl shadow-blue-950 p-6 md:p-8 shadow-2xl">
        {/* Title */}
        <p className="text-gradient text-4xl font-bold mb-2 text-left ">{title}</p>
        {/* Movie Year, PG Rating, Runtime */}
        <p className="text-gray-100 text-sm mb-6">
          {releaseYear && <span>{releaseYear}</span>}
          {runtimeInHoursAndMinutes && <span className="mx-2">•</span>}
          {runtimeInHoursAndMinutes && <span>{runtimeInHoursAndMinutes}</span>}
        </p>

        {/* Movie Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0 md:mr-8">
            <img
              src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
              alt={title}
              className="rounded-xl shadow-md"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
          {tagline && <p className="italic text-white mb-6 text-center md:text-left">"{tagline}"</p>}

            <p className="text-gray-100 text-base mb-6">{overview || 'No overview available.'}</p>

            {/* Movie Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white">🎭Genres:</h4>
                <p className="text-gray-100 pl-4.5">{genres?.map((genre) => genre.name).join(', ') || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">🗣️Language:</h4>
                <p className="text-gray-100 pl-4.5">{original_language?.toUpperCase() || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">💰Budget:</h4>
                <p className="text-gray-100 pl-4.5">{budget ? `$${(budget / 1_000_000).toFixed(1)}M` : 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">💵Revenue:</h4>
                <p className="text-gray-100 pl-4.5">{revenue ? `$${(revenue / 1_000_000).toFixed(1)}M` : 'N/A'}</p>
              </div>

              
              <div className="flex justify-between items-center col-span-2">
                <div>
                  <h4 className="font-semibold text-white">⭐Rating:</h4>
                  <p className="text-gray-100 pl-4.5">{vote_average?.toFixed(1) || 'N/A'}</p>
                </div>
              </div>
            </div>

           
            {cast.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-white">🎥Cast:</h4>
                <p className="text-gray-100 pl-1">
                  {cast.map((actor) => actor.name).join(', ')}
                </p>
              </div>
            )}

            {production_companies?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-white">🎬 Production Companies:</h4>
                <p className="text-gray-100 pl-1.5">
                  {production_companies.map((company) => company.name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
