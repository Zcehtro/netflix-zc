import { Carousel } from "react-responsive-carousel";

export default function CarouselMovieCards() {
  const [movies, setMovies] = useState(null)
  const [carouselSlides, setCarouselSlides] = useState([[]]);
  const bsBreakpoints = [0, 576, 768, 992, 1200, 1400];
  const winWidth = window.innerWidth;

  useEffect(() => {
    const getCarouselSize = () => {
      const postersInSlide = Math.max(
        ...bsBreakpoints.map((item) => {
          if (winWidth > item) return Math.floor(winWidth / 200);
          return 0;
        })
      );

      let tempCarouselSlides = [[]];
      let n = 0;
      let m = 1;

      movies &&
        movies.map((movie) => {
          tempCarouselSlides[n].push(movie);
          if (m > postersInSlide) {
            n += 1;
            m = 0;
          }
          m += 1;
        });
      setCarouselSlides(tempCarouselSlides);
      console.log(10.2, carouselSlides);
    };
    getCarouselSize();
  }, []);

  return (
    <Carousel showThumbs={false} dynamicHeight={false}>
      {movies.map((movie) => {
        return (
          <div className="movie-carousel-slide row g-0">
            <div className="movie-div-img col" key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie-poster" />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
