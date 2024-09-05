import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import NewMovie from './newMovie';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
//   director: string;
//   hero: string;
//   herione: string |null;
//   music_director: string |null;
//   rating: string |null;
//   story: string |null;
}

const Movielist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [edit,setEdit] =useState<string>('false')
  const navigate =useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movieslisting');
        console.log('answer');
        setMovies(response.data);
        return response.data;
       
        
      } catch (error) {
        console.log('Failed to fetch movies',error);
       
      } 
    };

    fetchMovies();
  }, []);

  console.log()



  const handleEdit =async ()=>{
    try{
        const response = await axios.put('http://127.0.0.1:8000/api/movieslisting');
        setEdit('true');
        console.log('handle edit workinng');
        return response;
        
    }catch{
        console.log('error edit')
    }
   
  }





  return (
    <>
    <h1>Movie List</h1>

    <div className='container'>
      
      <div className='list'>
        
        {movies.map((movie) => (
          <div key={movie.id} className='a' style={{flex: "1",margin: "15px",padding: "40px", border: "2px solid #ccc",}}>
            
            {/* <h2 >{movie.title}</h2>
            <h2>{movie.director}</h2> */}
            <Link to={`/new-movie/${movie.id}`}>{movie.title}</Link>
            {/* <h2>{movie.hero}</h2>
            <h2>{movie.herione}</h2>
            <h2>{movie.music_director}</h2>
            <h2>{movie.rating}</h2>
            <h5>{movie.story}</h5> */}
            
            
          </div>
        ))}  
      </div>
    </div>

    <div>
          <button><span style={{ color: 'blue', cursor: 'pointer' }}  onClick={()=>navigate('/new-movie')}>
            create movie
          </span>
          </button>
        </div>

        <button><span style={{ color: 'blue', cursor: 'pointer' }}  onClick={handleEdit.id}>
            edit
          </span>
          </button>
       
    </>
  );
};

export default Movielist;
