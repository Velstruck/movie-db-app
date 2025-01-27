import React from 'react'

const MovieCard = ({movie: { title,vote_average,release_date,poster_path,original_language }}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}/>
    </div>
  )
}

export default MovieCard