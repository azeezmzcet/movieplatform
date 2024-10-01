
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";

import Grid from '@mui/material/Grid2';
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";



import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateMovieRequest, deleteMovieRequest, showMovieRequest, } from '../redux/movieSlices';


interface Movies {
  id?: number;
  title?: string;
  director?: string;
  hero?: string;
  herione?: string | null;
  music_director?: string | null;
  rating?: string | null;
  story?: string | null;
}

const Movielisting: React.FC = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState<Movies>({});
   const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<Movies>({});
  const navigate = useNavigate();
  const { movieazeez } = useSelector((state: RootState) => state.movies);
  const dispatch=useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
   dispatch(showMovieRequest({ id: Number(id) }));
    
  
    // const fetchMovies = async () => {

    //   try {
    //     const response = await axios.get(
    //       `http://127.0.0.1:8000/api/movieslisting/${id}`
    //     );
    //     setMovies(response.data);
    //   } catch (error) {
    //     console.log("Failed to fetch movies", error);
    //   }
    // };

    // fetchMovies();

    const loggedIn = localStorage.getItem("Token");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [dispatch,id]);


  /////////

  const handleDelete = () => {
    dispatch(deleteMovieRequest({ id: Number(id) }));
    navigate("/");

    // if (isLoggedIn) {
    //   axios
    //     .delete(`http://127.0.0.1:8000/api/movieslisting/${id}`)
    //     .then(() => {
    //       navigate("/");
    //     })
    //     .catch((err) => {
    //       console.log("Failed to delete", err);
    //     });
    // }
  };

  const handleEditOpen = () => {
    if (isLoggedIn) {
      setEditData( movieazeez);
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEditSave = async () => {
    dispatch(updateMovieRequest({ id: Number(id), data: editData }));
    setMovies(editData);
      setModalOpen(false);
    // try {
    //   await axios.put(
    //     `http://127.0.0.1:8000/api/movieslisting/${id}`,
    //     editData
    //   );
                      //   setMovies(editData);
                      //   setModalOpen(false);
    // } catch (error) {
    //   console.log("Failed to update movie", error);
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleBackk = () => {
    navigate("/");
  };

  if (Object.keys(movieazeez).length === 0) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        Movie Listing
      </Typography>

      <IconButton
        sx={{
          position: "relative",
          bottom: "50px",
          color: "white",
          right: "40%",
        }}
        onClick={handleBackk}
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>

      <Grid size={{xs:12,sm:10,md:8}} >
        <Box
          sx={{
            p: 8,
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "black",
            mb: 2,
            width: "450px",
          }}
        >  
          <Typography variant="h6">Title:   <span style={{color:'blue'}}>{movieazeez.title}</span></Typography>
          <Typography variant="h6">Director:  <span style={{color:'blue'}}> {movieazeez.director}</span></Typography>
          <Typography variant="h6">Hero:   <span style={{color:'blue'}}> {movieazeez.hero}</span></Typography>
          <Typography variant="h6">Heroine:   <span style={{color:'blue'}}> {movieazeez.herione}</span></Typography>
          <Typography variant="h6">
            Music Director:  <span style={{color:'blue'}}> {movieazeez.music_director}</span>
          </Typography>
          <Typography variant="h6">Rating:  <span style={{color:'blue'}}> {movieazeez.rating}/100 </span></Typography>
          <Typography variant="body1">Story:   <span style={{color:'blue'}}> {movieazeez.story}</span></Typography>
        </Box>
      </Grid>

      {isLoggedIn && (
        <Grid size={{xs:12,sm:10,md:8}}>
          <Button
            onClick={handleEditOpen}
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </Grid>
      )}

      <Dialog open={modalOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={editData.title || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="director"
            label="Director"
            fullWidth
            value={editData.director || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hero"
            label="Hero"
            fullWidth
            value={editData.hero || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="herione"
            label="Herione"
            fullWidth
            value={editData.herione || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="music_director"
            label="Music Director"
            fullWidth
            value={editData.music_director || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rating"
            label="Rating"
            fullWidth
            value={editData.rating || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="story"
            label="Story"
            fullWidth
            value={editData.story || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Movielisting;

