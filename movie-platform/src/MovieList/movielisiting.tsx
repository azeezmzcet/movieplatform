import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


interface Movies {
  id?: number;
  title?:string;
  director?: string;
  hero?: string;
  herione?: string |null;
  music_director?: string |null;
  rating?: string |null;
  story?: string |null;
}

const Movielisting: React.FC = () => {
console.log("herhre")

const {id} = useParams();

console.log("id-found", id)

  const [movies, setMovies] = useState<Movies>({});
//   const [edit,setEdit] =useState<string>('false')
//   const navigate =useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movieslisting/${id}`);
        console.log('lising', response);
        setMovies(response.data);
        // return response.data;
       
        
      } catch (error) {
        console.log('Failed to fetch movies',error);
       
      } 
    };

    fetchMovies();
  }, [id]);


//   const handleEdit =async ()=>{
//     try{
//         const response = await axios.put(`http://127.0.0.1:8000/api/movieslisting/${id}`);
//         setEdit('true');
//         console.log('handle edit workinng');
//         return response;
        
//     }catch{
//         console.log('error edit')
//     }
   
//   }



  if (Object.keys(movies).length === 0) return <div>Loading...</div>;

  return (
    <>
    <h1>Movie Listing</h1>

    <div className='container'>
      
      <div className='list'>
          <div className='a' style={{flex: "1",margin: "15px",padding: "40px", border: "2px solid #ccc",}}>
            <h2 >{movies.title}</h2>
            <h2>{movies.director}</h2>
            <h2>{movies.hero}</h2>
            <h2>{movies.herione}</h2>
            <h2>{movies.music_director}</h2>
            <h2>{movies.rating}</h2>
            <h5>{movies.story}</h5>
          </div>
      </div>
    </div>
       
    </>
  );
};

export default Movielisting;
