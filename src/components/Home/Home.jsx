import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Home() {
  let page = 1;

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`,
      });
      console.log(1, data);
      setMovies(data.results);
    };
    getMovies();
  }, []);

  return (
    movies && (
      <div className="home-main">
        <div className="container-fluid movie-carousel">
          <div className="movie-carousel-slide row g-0 d-flex justify-content-start align-items-center">
            {movies.map((movie) => {
              return (
                <div className="col m-2" key={movie.id}>
                  <div className="movie-div-img">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt="movie-poster"
                        className="movie-poster-image"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
