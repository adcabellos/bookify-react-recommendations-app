import './App.css';
import { BrowserRouter, Route } from "react-router-dom"
import Recommend from './Recommend';
import GetInspired from './GetInspired';
import Header from "./Header";
import Access from "./Access";
import React, { useState, useEffect } from 'react';

function App() {

  let [genres, setGenres] = useState([])
  let [moods, setMoods] = useState([])

  useEffect(() => {
    getGenreValues()
    getMoods()
  }, [])

   function getGenreValues() {
    fetch("http://localhost:9000/recommend/getgenres")
    .then(res => res.json())
    .then(data => {
      setGenres(data)
    })
  }

  function getMoods() {
      fetch("http://localhost:9000/recommend/getmoods")
      .then(res => res.json())
      .then(data => {
        setMoods(data)
      })

  }


  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/">
        <Access />
      </Route>
      <Route path="/recommend">
        <Recommend genres={genres} moods={moods}/>
      </Route>
      <Route path="/getinspired">
        <GetInspired genres={genres} moods={moods} />
      </Route>
      <Route path="/access">
        <Access />
      </Route>
    </BrowserRouter>

  );
}

export default App;
