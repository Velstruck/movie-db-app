# MovieUrge App
Check out at [here](https://movieurge.netlify.app/)
This project is a movie database application built using React. It allows users to search for movies, view movie details, and see trending movies. The application leverages several technologies and APIs to provide a rich user experience.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications, used to navigate between different pages.
- **Appwrite**: A backend server for web, mobile, and flutter developers. It is used here to manage trending movies based on search counts.
- **TMDB API**: The Movie Database API is used to fetch movie details, search for movies, and get movie credits.

## Features

- **Search Movies**: Users can search for movies by entering a query in the search bar.
- **Movie Details**: Detailed information about a movie, including title, overview, genres, cast, and production companies.
- **Trending Movies**: Displays a list of trending movies based on the most searched movies.
- **Responsive Design**: The application is designed to be responsive and works well on different screen sizes.

## TMDB API

The application uses the following features of the TMDB API:
- **Search Movies**: Fetches movies based on a search query.
- **Movie Details**: Retrieves detailed information about a specific movie.
- **Movie Credits**: Gets the cast and crew information for a movie.

## Running the Project

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/movie-db-app.git
   cd movie-db-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open the application**:
   Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Conclusion
This project demonstrates how to build a movie database application using React, React Router, and Appwrite, with data fetched from the TMDB API. It showcases features like movie search, detailed movie information, and trending movies based on user searches.
