import "./Navbar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-main">
      <div className="container py-2">
        
          <div className="row d-flex align-items-center">
              <div className="col-1 d-flex justify-content-start">
                  <Link to="">
                    <img
                      src=".\logo192.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="React logo"
                    />
                  </Link>
              </div>
              <div className="col-2 nav-box-horizontal d-flex justify-content-between">
                <Link to="/movies" className="nav-link">
                  Movies
                </Link>
                <Link to="/tv-shows" className="nav-link">
                  TV Shows
                </Link>
                <Link to="/search" className="nav-link">
                  Search
                </Link>
              </div>
          </div>
      </div>
    </div>
  );
}
