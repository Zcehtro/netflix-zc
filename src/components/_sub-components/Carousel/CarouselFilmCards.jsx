import { Carousel } from "react-responsive-carousel";

export default function CarouselFilmCards() {
  const [carouselSlides, setCarouselSlides] = useState([[]]);
  const bsBreakpoints = [0, 576, 768, 992, 1200, 1400];
  const winWidth = window.innerWidth;

  useEffect(() => {
    const getCarouselSize = async () => {
      const postersInSlide = Math.max(
        ...bsBreakpoints.map((item) => {
          if (winWidth > item) return Math.floor(winWidth / 200);
          return 0;
        })
      );

      let tempCarouselSlides = [[]];
      let n = 0;
      let m = 1;

      films &&
        films.map((film) => {
          tempCarouselSlides[n].push(film);
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
      {films.map((film) => {
        return (
          <div className="film-carousel-slide row g-0">
            <div className="film-div-img col" key={film.id}>
              <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt="film-poster" />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
