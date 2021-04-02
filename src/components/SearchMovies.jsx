import React, {useState} from 'react'

import MovieCard from "./MovieCard"

const SearchMovies = () => {

    //we are going to use state to dynamically manage changes in the data.
    //we are creating two states: 1.to manage input query, 2. to manage movies data.

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]); //This is an array because it's going to contain the related movies to be displayed
    // setQuery(){

    // }

    const SearchMovies = async(e) =>{
        e.preventDefault();
        // const query = "Jurassic Park";
        const url=`https://api.themoviedb.org/3/search/movie?api_key=ce530d7df7fad4f31f83d4cc86365236&language=en-US&query=${query}&page=1&include_adult=false`;
    
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results)
            setMovies(data.results);// This sets the related movies to be displayed on the screen.
        }catch(err){
            console.error(err)
        }    
    }

    return (
        <div className="card-list">
            <form className="form"  onSubmit={SearchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input className= "input" type="text" name="query" placeholder="e.g The Last Airbender"
                value= {query} onChange={(e) => setQuery(e.target.value)}/>
                <button className="button" type="submit" value="Submit" >Search</button>
            </form>
            {
            /* when you use a map you must always use a key, usually an id. */
            // the filter function used here will allow movies with url(poster_path) to be displayed
            }
            
            {
            movies.filter(movie =>movie.poster_path).map( movie => (
               <MovieCard movie={movie} key={movie.id}/>
            ))
            }
        </div>
    )
}

export default SearchMovies;