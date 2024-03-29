import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Movie_test from "./_tests/movie_test";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Actor from "./components/Actor/Actor";
import TV from "./components/TV/TV";

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/actor/:id" element={<Actor />} />
        <Route path="/tv/:id" element={<TV />} />
        <Route path="/testing" element={<Movie_test />} />
      </Routes>
    </div>
  );
}
