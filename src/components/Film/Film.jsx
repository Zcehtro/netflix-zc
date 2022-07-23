import "./Film.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Film() {
  const [film, setFilm] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getFilm = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://api.themoviedb.org/3/movie/${params.id}?api_key=3c218b6f41d174f4c821dae4cb86da37`,
        });
        console.log(2, data);
        setFilm(data);
      } catch (err) {
        console.log("film error: " & err);
      }
    };
    getFilm();
  }, []);

  return (
    film && (
      <div className="film-main">
        <div className="div-film-backdrop">
          <img className="film-backdrop" src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt="film-backdrop" />
        </div>
        <div className="film-info-group">
          <div className="film-info-group-left">
            <div className="film-specific-info"></div>
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
