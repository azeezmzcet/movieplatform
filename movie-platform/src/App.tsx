import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./log-reg/Signup";
import Login from "./log-reg/Login";
import Movielist from "./MovieList/movielist";
import NewMovie from "./MovieList/newMovie";
import Movielisting from "./MovieList/movielisiting";
// import { Counter } from "./Counter";
// import Parent from "./parnet/parent";

function App() {
 


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Movielist />} />
          <Route path="/new-movie" element={<NewMovie />} />
          <Route path="/new-movie/:id" element={<Movielisting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* without redux */}
          {/* <Route path="/parent" element={<Parent />} /> */}
          {/* with redux */}
          {/* <Route path="/counter" element={<Counter />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
