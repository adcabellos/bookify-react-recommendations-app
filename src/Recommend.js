import React, { useState, useEffect } from 'react';
import { isLoggedIn } from './functions';
import './App.css';

function Recommend(props) {

  let genres = props.genres;
  let moods = props.moods;

  var [title, setTitle] = useState("");
  var [author, setAuthor] = useState("");
  var [genre, setGenre] = useState("");
  var [image, setImage] = useState("");
  var [mood, setMood] = useState("");

  var [warningMessage, setWarningMessage] = useState("");
  var [warningInfo, setWarningInfo] = useState([]);


  useEffect(() => {
    isLoggedIn()
  }, [])


  function isEmpty() {
    if (title === "" || author === "" || genre === "" || image === "" || mood === "") {
      alert("Please, do not leave empty fields!")
      return true;
    }
    return false;
  }

  function callAPI() {
    if (isEmpty()) {
      return;
    }

    let objectRecommend = { "title": title, "author": author, "genre": genre, "image": image, "mood": mood };

    let fetchData = {
      method: "POST",
      body: JSON.stringify(objectRecommend),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }

    fetch("http://localhost:9000/recommend/newbook", fetchData)
      .then(res => res.json())
      .then(data => {
        setWarningMessage(data.message);
        setWarningInfo(data.info);
        clearFormFields()
      })
  }

  function clearFormFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('select-genre').value = '';
    document.getElementById('select-mood').value = '';
    document.getElementById('url').value = '';
  }


  return (
    <>
      <div className="recommend-div">

        <label className="bold" htmlFor="name">Title</label>
        <input type="text" id="title" placeholder="book title" value={title} onChange={event => setTitle(event.target.value)} />

        <label className="bold" htmlFor="name">Author</label>
        <input type="text" id="author" placeholder="book author" value={author} onChange={event => setAuthor(event.target.value)} />

        <label htmlFor="select-genre"> Select your book's genre </label>
        <select name="Genres" id="select-genre" value={genre} onChange={event => setGenre(event.target.value)} >
          <option hidden selected>Select an option</option>

          {genres.map(function (genre, index) {
            return <option key={index} value={genre.Title}>{genre.Title}</option>
          })}
        </select>

        <label htmlFor="select-mood"> Which mood would you recommend it for? </label>
        <select name="moods" id="select-mood" value={mood} onChange={event => setMood(event.target.value)} >
          <option hidden selected>Select your mood</option>

          {moods.map(function (mood, index) {
            return <option key={index} value={mood.title}>{mood.title}</option>
          })}
        </select>

        <label className="bold" htmlFor="name">Image</label>
        <input type="text" id="url" placeholder="image url" value={image} onChange={event => setImage(event.target.value)} />


        <button className="bold" id="button-reserva" type="submit" onClick={callAPI}>Send my recommendation </button>

        <div>
          <p className="warning">{warningMessage}</p>
        </div>

        {(warningInfo !== undefined && warningInfo !== null) ? 
        
              <div className="book">
                <h1> {warningInfo[0]} </h1>
                <h2>{warningInfo[1]} </h2>
                <img src={warningInfo[2]} />
                <h3> {warningInfo[3]}</h3>
                <h4> {warningInfo[4]}</h4>
              </div>
            : ''
        }
      </div>
    </>
  )
}

export default Recommend; 