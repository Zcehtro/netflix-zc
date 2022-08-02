import "./Actor.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Actor() {
  const [actor, setActor] = useState(null);
  const params = useParams();

  const endpoints = [
    `https://api.themoviedb.org/3/person/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/person/${params.id}/combined_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/person/${params.id}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/person/${params.id}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
  ];

  useEffect(() => {
    const getActor = async () => {
      try {
        const promise = await Promise.all(
          endpoints.map((endpoint) => {
            return axios({ method: "get", url: endpoint });
          })
        );
        const [{ data: details }, { data: credits }, { data: external_ids }, { data: images }] =
          promise;
        setActor({
          details,
          credits,
          external_ids,
          images,
        });
      } catch (err) {
        console.log(13, "actor error: " & err);
      }
    };
    getActor();
  }, [params]);

  const creditsOrdered = () => {
    const moviesSorted = actor.credits.cast.sort((a, b) => b.popularity - a.popularity);
    const moviesFiltered = moviesSorted//filter((element, index) => moviesSorted.indexOf(element) !== index);
    console.log(32, moviesFiltered);
    return moviesFiltered;
  };

  console.log(30, actor);
  return (
    actor && (
      <div className="actor-main">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="div-actor-portrait">
                <img
                  className="actor-portrait"
                  src={`https://image.tmdb.org/t/p/w500${actor.details.profile_path}`}
                  alt="actor-portrait"
                />
              </div>
            </div>
            <div className="col-8">
              <p className="actor-name">{actor.details.name}</p>
              <p className="actor-subtitle">Biography</p>
              <p>{actor.details.biography}</p>
            </div>
          </div>
          <div className="row movie-carousel-slide g-0">
            <p>Known for</p>
            {creditsOrdered().map((media) => {
              return (
                <div className="col" key={media.id}>
                  <div className="movie-div-img">
                    <Link to={`/${media.media_type}/${media.id}`} className="movie-poster-anchor">
                      {media.poster_path !== null ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                          alt="movie-poster"
                          className="movie-poster-image"
                        />
                      ) : (
                        <div className="movie-poster-image">Poster missing</div>
                      )}
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
