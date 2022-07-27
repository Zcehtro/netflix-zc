import "./Film.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { intervalToDuration } from "date-fns";

export default function Film() {
  const [film, setFilm] = useState(null);
  const params = useParams();

  const endpoints = [
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/movie/${params.id}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    `https://api.themoviedb.org/3/movie/${params.id}/release_dates?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/${params.id}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_image_language=en`,
  ];

  useEffect(() => {
    const getFilm = async () => {
      try {
        const promise = await Promise.all(
          endpoints.map((endpoint) => {
            return axios({ method: "get", url: endpoint });
          })
        );
        const [
          { data: details },
          { data: credits },
          { data: external_ids },
          { data: release_dates },
          { data: similar },
          { data: images },
        ] = promise;
        setFilm({ details, credits, external_ids, release_dates, similar, images });
      } catch (err) {
        console.log(13, "film error: " & err);
      }
    };
    getFilm();
  }, [params]);

  const getIsFilmNew = (filmDateString) => {
    const filmDate = new Date(filmDateString);
    const nowDate = new Date();
    const diffDays = Math.ceil((nowDate - filmDate) / 1000 / 24 / 60 / 60);

    return diffDays <= 30;
  };

  const getFilmReleaseYear = () => {
    return new Date(film.details.release_date).getFullYear();
  };

  const getCertfication = () => {
    const index1 = film.release_dates.results.findIndex((country) => country.iso_3166_1 === "US");
    if (index1 === -1) return "Certification not available";
    const releaseDates = film.release_dates.results[index1].release_dates;

    const index2 = releaseDates.findIndex((release) => release.type >= 3);
    if (index2 !== -1) {
      return releaseDates[index2].certification;
    }
  };

  const getFilmDurationFormatted = () => {
    const durationMilliseconds = Number(film.details.runtime) * 60 * 1000;
    if (durationMilliseconds === 0) return "Runtime not available";

    const duration = intervalToDuration({ start: 0, end: durationMilliseconds });
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const getCastShort = () => {
    let castShort = [];
    film.credits.cast.map((actor) => {
      if (castShort.length === 4) return;
      castShort.push(actor);
    });
    return castShort;
  };

  console.log(20, film);
  return (
    film && (
      <div className="film-main container-fluid">
        <div className="div-film-backdrop">
          <img
            className="film-backdrop"
            src={`https://image.tmdb.org/t/p/w500${film.details.backdrop_path}`}
            alt="film-backdrop"
          />
          {film.images.logos.length !== 0 ? (
            <img
              className="film-logo"
              src={`https://image.tmdb.org/t/p/w500${film.images.logos[0].file_path}`}
              alt="film-logo"
            />
          ) : (
            <div className="film-logo">{film.details.title}</div>
          )}
        </div>
        <div className="film-info-group row">
          <div className="film-info-group-left col-8">
            <div className="film-specific-info">
              {getIsFilmNew(film.details.release_date) ? (
                <div className="film-specific-info-item">
                  <p className="film-is-new">New</p>
                </div>
              ) : null}
              <div className="film-specific-info-item">
                <p className="film-info-year">{getFilmReleaseYear()}</p>
              </div>
              <div className="film-specific-info-item">
                <p className="film-info-certification">{getCertfication()} </p>
              </div>
              <div className="film-specific-info-item">
                <p className="film-info-duration">{getFilmDurationFormatted()} </p>
              </div>
            </div>
            <div className="film-short-summary">{film.details.overview}</div>
          </div>
          <div className="film-info-group-right col-4">
            <div className="film-cast-short">
              <span className="film-group-subtitle">Cast: </span>
              {getCastShort().map((actor) => {
                return (
                  <>
                    <Link to={`/actors/${actor.id}`} className="film-actor-anchor">
                      {actor.name}
                    </Link>
                    <span className="film-actor-anchor">, </span>
                  </>
                );
              })}
              <Link to="" className="film-actor-anchor" style={{ fontStyle: "italic" }}>
                more
              </Link>
            </div>
            <div className="film-genres">
              <span className="film-group-subtitle">Genres: </span>
              {film.details.genres.map((genre) => {
                return (
                  <>
                    <Link to={`/genres/${genre.id}`} className="film-actor-anchor">
                      {genre.name}
                    </Link>
                    {genre.id === film.details.genres[film.details.genres.length - 1].id ? null : (
                      <span className="film-actor-anchor">, </span>
                    )}
                  </>
                );
              })}
            </div>
            <div className="film-tags"></div>
          </div>
        </div>
      </div>
    )
  );
}
