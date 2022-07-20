import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Home() {
  let page = 1;

  const [films, setFilms] = useState(null);

  useEffect(() => {
    const getFilms = async () => {
      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/discover/movie?api_key=3c218b6f41d174f4c821dae4cb86da37&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`,
      });
      console.log(1, data);
      setFilms(data.results);
    };
    getFilms();
  }, []);

  return (
    films && (
      <div className="home-main">
        <div className="container-fluid film-carousel">
          <div className="film-carousel-slide row g-0 d-flex justify-content-start align-items-center">
            {films.map((film) => {
              return (
                <div className="col m-2" key={film.id}>
                  <div className="film-div-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                      alt="film-poster"
                      className="film-poster-image"
                    />
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
