import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Box } from "@mui/material";

interface Movie {
  id: number;
  title: string;
}

const Movielist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moviesPerPage] = useState<number>(9);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/movieslisting"
        );
        console.log("answer");
        setMovies(response.data);
        return response.data;
      } catch (error) {
        console.log("Failed to fetch movies", error);
      }
    };

    fetchMovies();
    const logg̥edIN = localStorage.getItem("Token");
    console.log("🚀 ~ useEffect ~ logg̥edIN:", logg̥edIN);
    if (logg̥edIN) {
      setIsLoggedIn(true);
    }
    console.log("log fech");
  }, []);

  console.log();

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handlenewmovie = () => {
    navigate("/new-movie");
    console.log("newmovue show");
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.clear()
    } else {
      navigate("/login");
    }
  };



  return (
    <div style={{ maxWidth: "800px" }}>
      <div className="movieheader">
        <header
          style={{
            textAlign: "center",
            padding: "1px",
            backgroundColor: "white",
            color: "black",
            position: "relative",
            backgroundImage: `url(https://emojipedia.org/_next/image?url=https%3A%2F%2Fem-content.zobj.net%2Fcontent%2Fevents%2FGuy_Fawkes_PNG.png&w=640&q=75)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1>Movie List</h1>

          {isLoggedIn && (
            <button
              style={{
                position: "absolute",
                color: "blue",
                cursor: "pointer",
                top: "40%",
                left: "10px",
              }}
              onClick={handlenewmovie}
            >
              <span style={{ color: "blue", cursor: "pointer" }}>
                Create Movie
              </span>
            </button>
          )}

          <button
            style={{
              color: "blue",
              cursor: "pointer",
              right: "20px",
              top: "40%",
              position: "absolute",
            }}
            onClick={handleLogin}
          >
            <span style={{ color: "blue", cursor: "pointer" }}>
              {isLoggedIn ? "logout" : "login"}
            </span>
          </button>
        </header>
      </div>

      <Box
        sx={{
          width: "800px",
          height: 500,
          overflowY: "scroll",
          backgroundColor: "#000",
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 10px",
          }}
        >
          <div className="list">
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                className="a"
                style={{
                  marginBottom: "20px",
                  padding: "20px",
                  border: "2px solid white",
                  borderRadius: "10px",
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Link to={`/new-movie/${movie.id}`}>{movie.title}</Link>
              </div>
            ))}
          </div>
        </div>

        <div></div>
      </Box>

      <Stack
        spacing={2}
        sx={{ my: 2 }}
        style={{ display: "flex", position: "relative", left: "40%" }}
      >
        <Pagination
          count={Math.ceil(movies.length / moviesPerPage)}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Movielist;
