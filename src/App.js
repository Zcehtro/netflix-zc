import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Film from "./components/Film/Film";
import Film_test from "./_tests/film_test";

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/films/:id" element={<Film />} />
        <Route path="/testing" element={<Film_test />} />
      </Routes>
    </div>
  );
}
