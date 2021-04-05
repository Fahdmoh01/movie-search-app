import React from 'react';
import SearchMovies from "./components/SearchMovies"
import './App.css';
//import Pagination from './components/Pagination';

function App() {
  return (
    <div className="container">
      <h1 className="title"> Movie Search App</h1>
      <SearchMovies />
    </div>
  );
}

export default App;
