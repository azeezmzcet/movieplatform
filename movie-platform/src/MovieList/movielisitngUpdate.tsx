import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface listing {
  id?: number | null | string;
  title?: string | number;
  director?: string | number;
  hero?: string | number;
  herione?: string;
  music_director?: string;
  rating?: string;
  story?: string;
}

function MovielisitngUpdate() {
  const { id } = useParams();
  const [show, setShow] = useState<listing>({
    id: id,
    title: "",
    director: "",
    hero: "",
    herione: "",
    music_director: "",
    rating: "",
    story: "",
  });
  console.log("iaxzxascsafc", id);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/movieslisting/${id}`)
      .then((res) => {
        setShow({
          ...show,
          title: res.data.title,
          director: res.data.director,
          hero: res.data.hero,
          herione: res.data.herione,
          music_director: res.data.music_director,
          rating: res.data.rating,
          story: res.data.story,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const navigate = useNavigate();

  console.log("handlesubmit eorking 0");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handlesubmit working inner");
    axios
      .put(`http://127.0.0.1:8000/api/movieslisting/${id}`, show)
      .then((res) => {
        console.log("handlesubmit eorking 2");
        setShow({
          ...show,
          title: res.data.title,
          director: res.data.director,
          hero: res.data.hero,
          herione: res.data.herione,
          music_director: res.data.music_director,
          rating: res.data.rating,
          story: res.data.story,
        });

        navigate(`/new-movie/${id}`);
        console.log("res wirking", res);
      })

      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="listupdate">
      <div>movielisitngUpdate </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title:</label>
        <input
          placeholder="Title"
          type="title "
          value={show.title}
          onChange={(e) => setShow({ ...show, title: e.target.value })}
        />
        <label htmlFor="director"> Director:</label>
        <input
          placeholder="Director"
          type="director"
          value={show.director}
          onChange={(e) => setShow({ ...show, director: e.target.value })}
        />
        <label htmlFor="hero"> Hero:</label>
        <input
          placeholder="Hero"
          type="hero"
          value={show.hero}
          onChange={(e) => setShow({ ...show, hero: e.target.value })}
        />

        <label htmlFor="herione"> Heroine:</label>
        <input
          placeholder="Heroine"
          type="herione"
          value={show.herione}
          onChange={(e) => setShow({ ...show, herione: e.target.value })}
        />
        <label htmlFor="music_director"> music director:</label>
        <input
          placeholder="music director"
          type="music_director"
          value={show.music_director}
          onChange={(e) => setShow({ ...show, music_director: e.target.value })}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          placeholder="Rating"
          type="rating"
          value={show.rating}
          onChange={(e) => setShow({ ...show, rating: e.target.value })}
        />
        <label htmlFor="story"> Story:</label>
        <input
          placeholder="Story"
          type="story"
          value={show.story}
          onChange={(e) => setShow({ ...show, story: e.target.value })}
        />

        <button>Edit</button>
      </form>
    </div>
  );
}

export default MovielisitngUpdate;
