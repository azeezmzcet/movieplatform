import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { TextField, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function NewMovie() {
  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [hero, setHero] = useState<string>("");
  const [herione, setHerione] = useState<string>("");
  const [music_director, setMusic_director] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [story, setStory] = useState<string>("");

  const [errors, setErrors] = useState({
    title: false,
    director: false,
    hero: false,
    rating: false,
  });

  const navigate = useNavigate();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: !e.target.value,
    }));
  };
  const handleDirector = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      director: !e.target.value,
    }));
  };

  const handleHero = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHero(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hero: !e.target.value,
    }));
  };

  const handleMovieList = async () => {
    const newErrors = {
      title: !title,
      director: !director,
      hero: !hero,
      rating: !rating || Number(rating) < 0 || Number(rating) > 100,
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.director && !newErrors.hero)
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/movieslisting",
          {
            title,
            director,
            hero,
            herione,
            music_director: music_director,
            rating,
            story,
          }
        );
        navigate("/");
        return response;
      } catch (error) {
        console.log("error", error);
      }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ position: "relative", padding: "0px", width: "820px" }}>
      <IconButton
        style={{
          position: "absolute",
          top: "5px",
          left: "40px",
          color: "white",
        }}
        onClick={handleBack}
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        New Movie
      </Typography>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "15px solid #543d46",
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Movie Name"
              value={title}
              onChange={handleTitle}
              required
              error={errors.title}
              helperText={errors.title ? "Name is reqquired" : " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Director"
              value={director}
              onChange={handleDirector}
              required
              error={errors.director}
              helperText={errors.director ? "direcotr is required" : " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Hero"
              value={hero}
              onChange={handleHero}
              required
              error={errors.hero}
              helperText={errors.hero ? "Hero is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Heroine"
              value={herione}
              onChange={(e) => setHerione(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Music Director"
              value={music_director}
              onChange={(e) => setMusic_director(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              // error={errors.rating}
              // helperText={errors.rating ? " rating 0 to 100" : ''}

              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid p={1}>
            <TextField
              fullWidth
              label="Story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
        </Grid>
      </div>

      <Button
        variant="contained"
        color="success"
        style={{ marginTop: "20px" }}
        onClick={handleMovieList}
      >
        OK
      </Button>
    </div>
  );
}
