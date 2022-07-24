import "./Film.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Film() {
  const [film, setFilm] = useState(null);
  const [filmCertRelease, setFilmCertRelease] = useState(null)
  const params = useParams();

  useEffect(() => {
    const getFilm = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        });
        console.log(20, data);
        setFilm(data);
      } catch (err) {
        console.log("film error: " & err);
      }
    };
    const getFilmCertRelease = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://api.themoviedb.org/3/movie/${params.id}release_dates?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        });
        console.log(21, data);
        setFilmCertRelease(data);
      } catch (err) {
        console.log("film error cert: " & err);
      }
    };
    getFilm();
    getFilmCertRelease();
  }, [params]);

  const isFilmNew = (filmDateString) => {
    const filmDate = new Date(filmDateString);
    const nowDate = new Date();
    const diffDays = Math.ceil((nowDate - filmDate) / 1000 / 24 / 60 / 60);

    console.log(3, diffDays);
    return diffDays <= 30;
  };

  return (
    film && (
      <div className="film-main">
        <div className="div-film-backdrop">
          <img
            className="film-backdrop"
            src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
            alt="film-backdrop"
          />
        </div>
        <div className="film-info-group">
          <div className="film-info-group-left">
            <div className="film-specific-info">
              {isFilmNew(film.release_date) ? <span className="film-is-new">New</span> : null}
              <span>{new Date(film.release_date).getFullYear()}</span>
            </div>
            <div className="film-short-summary"></div>
          </div>
          <div className="film-info-group-right">
            <div className="film-cast-short"></div>
            <div className="film-genres"></div>
            <div className="film-tags"></div>
          </div>
        </div>
      </div>
    )
  );
}
