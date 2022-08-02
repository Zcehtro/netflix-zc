import "./Movie.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { intervalToDuration } from "date-fns";

export default function Movie() {
  const [movie, setMovie] = useState(null);
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
    const getMovie = async () => {
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
        setMovie({ details, credits, external_ids, release_dates, similar, images });
      } catch (err) {
        console.log(13, "movie error: " & err);
      }
    };
    getMovie();
  }, [params]);

  const getIsMovieNew = (movieDateString) => {
    const movieDate = new Date(movieDateString);
    const nowDate = new Date();
    const diffDays = Math.ceil((nowDate - movieDate) / 1000 / 24 / 60 / 60);

    return diffDays <= 30;
  };

  const getMovieReleaseYear = () => {
    return new Date(movie.details.release_date).getFullYear();
  };

  const getCertfication = () => {
    const index1 = movie.release_dates.results.findIndex((country) => country.iso_3166_1 === "US");
    if (index1 === -1) return "Certification not available";
    const releaseDates = movie.release_dates.results[index1].release_dates;

    const index2 = releaseDates.findIndex((release) => release.type >= 3);
    if (index2 !== -1) {
      return releaseDates[index2].certification;
    }
  };

  const getMovieDurationFormatted = () => {
    const durationMilliseconds = Number(movie.details.runtime) * 60 * 1000;
    if (durationMilliseconds === 0) return "Runtime not available";

    const duration = intervalToDuration({ start: 0, end: durationMilliseconds });
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const getCastShort = () => {
    let castShort = [];
    movie.credits.cast.map((actor) => {
      if (castShort.length === 4) return;
      castShort.push(actor);
    });
    return castShort;
  };

  console.log(20, movie);
  return (
    movie && (
      <div className="movie-main">
        <div className=" container">
          <div className="div-movie-backdrop">
            <img
              className="movie-backdrop"
              src={`https://image.tmdb.org/t/p/w500${movie.details.backdrop_path}`}
              alt="movie-backdrop"
            />
            {movie.images.logos.length !== 0 ? (
              <img
                className="movie-logo"
                src={`https://image.tmdb.org/t/p/w500${movie.images.logos[0].file_path}`}
                alt="movie-logo"
              />
            ) : (
              <div className="movie-logo">{movie.details.title}</div>
            )}
          </div>
          <div className="movie-info-group row">
            <div className="movie-info-group-left col-8">
              <div className="movie-specific-info">
                {getIsMovieNew(movie.details.release_date) ? (
                  <div className="movie-specific-info-item">
                    <p className="movie-is-new">New</p>
                  </div>
                ) : null}
                <div className="movie-specific-info-item">
                  <p className="movie-info-year">{getMovieReleaseYear()}</p>
                </div>
                <div className="movie-specific-info-item">
                  <p className="movie-info-certification">{getCertfication()} </p>
                </div>
                <div className="movie-specific-info-item">
                  <p className="movie-info-duration">{getMovieDurationFormatted()} </p>
                </div>
              </div>
              <div className="movie-short-summary">{movie.details.overview}</div>
            </div>
            <div className="movie-info-group-right col-4">
              <div className="movie-cast-short">
                <span className="movie-group-subtitle">Cast: </span>
                {getCastShort().map((actor) => {
                  return (
                    <>
                      <Link to={`/actor/${actor.id}`} className="movie-actor-anchor">
                        {actor.name}
                      </Link>
                      <span className="movie-actor-anchor">, </span>
                    </>
                  );
                })}
                <Link to="" className="movie-actor-anchor" style={{ fontStyle: "italic" }}>
                  more
                </Link>
              </div>
              <div className="movie-genres">
                <span className="movie-group-subtitle">Genres: </span>
                {movie.details.genres.map((genre) => {
                  return (
                    <>
                      <Link to={`/genres/${genre.id}`} className="movie-actor-anchor">
                        {genre.name}
                      </Link>
                      {genre.id ===
                      movie.details.genres[movie.details.genres.length - 1].id ? null : (
                        <span className="movie-actor-anchor">, </span>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="movie-tags"></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
