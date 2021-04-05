import React, {useState} from 'react'

import MovieCard from "./MovieCard"
//import Pagination from "react-js-pagination"
import Pagination from "./Pagination"

const SearchMovies = () => {

    //we are going to use state to dynamically manage changes in the data.
    //we are creating two states: 1.to manage input query, 2. to manage movies data.

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]); //This is an array because it's going to contain the related movies to be displayed
   // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

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

    // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const renderMovies = currentPosts.filter(movie =>movie.poster_path).map( movie => (
    <MovieCard movie={movie} key={movie.id}/>
 ))

 const paginate = pageNumber => setCurrentPage(pageNumber);
//  const handlePageChange = ( pageNumber ) => {
//     console.log( `active page is ${ pageNumber }` );
//     setCurrentPage( pageNumber )
//  };

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
            renderMovies
            }
             <div className="pagination">
            {/* <Pagination
               activePage={ currentPage}
               //itemsCountPerPage={ 5 }
               totalItemsCount={ movies.length }
               pageRangeDisplayed={ 3 }
               onChange={ handlePageChange }
            /> */}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={movies.length}
                paginate={paginate}
             />

            </div> 

            
    
        </div>
    )
}

export default SearchMovies;