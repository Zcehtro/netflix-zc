import "./Navbar.css";
import { Link } from "react-router-dom";
import reactLogo from "../../assets/logo192.png";

export default function NavBar() {
  return (
    <div className="navbar-main">
      <div className="container-fluid py-2">
        <div className="row d-flex align-items-center">
          <div className="col-1 d-flex justify-content-center">
            <Link to="">
              <img
                src={reactLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React logo"
              />
            </Link>
          </div>
          <div className="col-3 navbar-box-horizontal d-flex justify-content-start">
            <Link to="/movies" className="navbar-link">
              Movies
            </Link>
            <Link to="/tv-shows" className="navbar-link">
              TV Shows
            </Link>
            <Link to="/search" className="navbar-link">
              Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
