import { useState } from 'react';
 import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NewMovie() {
  const [title, setTitle] = useState<string>('');
  const [director, setDirector] = useState<string>('');
  const [hero, setHero] = useState<string>('');
  const [herione, setHerione] = useState<string>('');
  const [music_director, setMusicDirector] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [story, setStory] = useState<string>('');

  const navigate = useNavigate();

  const handleMovieList = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/movieslisting', {
        title,
        director,
        hero,
        herione,
        music_director,
        rating,
        story,
      });
      navigate('/');
      return response;
      
      
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <div>New Movie</div>
      <input
        type="text"
        placeholder="Movie name"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Director"
        name="director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hero"
        name="hero"
        value={hero}
        onChange={(e) => setHero(e.target.value)}
      />
      <input
        type="text"
        placeholder="Heroine"
        name="heroine"
        value={herione}
        onChange={(e) => setHerione(e.target.value)}
      />
      <input
        type="text"
        placeholder="Music Director"
        name="music_director"
        value={music_director}
        onChange={(e) => setMusicDirector(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rating"
        name="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <input
        type="text"
        placeholder="Story"
        name="story"
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />

      <Button variant="contained" color="success" onClick={handleMovieList}>
        OK
      </Button>

    </>
  );
}
