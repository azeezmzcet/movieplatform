import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {  TextField, Button, IconButton, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';


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

  const handleMovieList = async () => {

    const newErrors = {
      title: !title,
      director: !director,
      hero: !hero,
      rating: !rating || isNaN(Number(rating)) || Number(rating) < 0 || Number(rating) > 100,
    };

    setErrors(newErrors);

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

      <div style={{ backgroundColor:'white',  borderRadius:'5px' , border: "15px solid #543d46", }}>
        
          <Grid item xs={12} sm={6} p={1}>
            <TextField 
              fullWidth
              label="Movie Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
        
              required
              error={errors.title}
              helperText={errors.title ? "Movie Name is required" : ""}

              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1} >
            <TextField
              fullWidth
              label="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
              error={errors.director}
              helperText={errors.director ? "Director is required" : ""}

              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <TextField
              fullWidth
              label="Hero"
              value={hero}
              onChange={(e) => setHero(e.target.value)}
              required
              error={errors.hero}
              helperText={errors.hero ? "Hero is required" : ""}

              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <TextField
              fullWidth
              label="Heroine"
              value={herione}
              onChange={(e) => setHerione(e.target.value)}
             
              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}

            
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <TextField
              fullWidth
              label="Music Director"
              value={music_director}
              onChange={(e) => setMusic_director(e.target.value)}
              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1} >
            <TextField
              fullWidth
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <TextField
              fullWidth
              label="Story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              sx={{
               
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  fontFamily: "Arial",
                  fontWeight: "bold"
              }
            }}
            />
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
