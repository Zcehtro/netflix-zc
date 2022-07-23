import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Film from "./components/Film/Film";

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films/:id" element={<Film />} />
      </Routes>
    </div>
  );
}
