import React, { useState, useEffect } from 'react';
import { isLoggedIn } from './functions';


function GetInspired(props) {
  let genres = props.genres;
  let moods = props.moods;

  const [books, setBooks] = useState([]);
  let [votedBooks, setVotedBooks] = useState([]);
  let [mostVotedBooks, setMostVotedBooks] = useState([])

  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");


  useEffect(() => {
    isLoggedIn()
  }, [])

  //Traer libros por género y mood
  function callAPIGenreMood() {

    let objectInspired = { "genre": genre, "mood": mood };

    let fetchData = {
      method: "POST",
      body: JSON.stringify(objectInspired),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }

    fetch("http://localhost:9000/getinspired/genremoods", fetchData)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setVotedBooks("");
      })
  }

  //Votar y traer datos del voto actualizados
  function callForVoting(bookTitle) {

    let objectToVote = { "title": bookTitle };

    let fetchData = {
      method: "PUT",
      body: JSON.stringify(objectToVote),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }
    fetch("http://localhost:9000/getinspired/vote", fetchData)
      .then(res => res.json())
      .then(data => {
        debugger;
        setVotedBooks(data.secondResponseVote);
        setBooks("");
        setMostVotedBooks("");
      })
  }
  //Traer libros más votados  

  function callAPIMostVoted() {
    fetch("http://localhost:9000/getinspired/mostVoted")
      .then(res => res.json())
      .then(data => {
        setMostVotedBooks(data);
        setBooks("");
      })
  }


  return (
    <>
      <div className="get-inspired-div">
        <div className="genre-mood-div">

          <label htmlFor="select-genre"> Select your book's genre </label>
          <select name="Genres" id="select-genre" value={genre} onChange={event => setGenre(event.target.value)} >
            <option hidden selected>Select an option</option>

            {genres.map(function (genre, index) {
              return <option key={index} value={genre.Title}>{genre.Title}</option>
            })}
          </select>

          <label htmlFor="select-mood"> Which mood are you in? </label>
          <select name="moods" id="select-mood" value={mood} onChange={event => setMood(event.target.value)} >
            <option hidden selected>Select your mood</option>

            {moods.map(function (mood, index) {
              return <option key={index} value={mood.title}>{mood.title}</option>
            })}
          </select>
          <button className="bold" id="button-reserva" type="submit" onClick={callAPIGenreMood}>Inspire me</button>

          <p> OR... GET INSPIRED WITH THE 10 MOST VOTED READINGS</p>
          <button className="bold" id="button-reserva" type="submit" onClick={callAPIMostVoted}>Most voted</button>
        </div>
      </div>
      {/* 
      <div className="most-voted-div">
        
      </div> */}



      {(votedBooks && votedBooks.length > 0) &&
        <div id="voting-div">
          <p>Thank you for voting!</p>
          <h1>{votedBooks[0].title}</h1>
          <h2>{votedBooks[0].author}</h2>
          <img src={votedBooks[0].image}></img>
          <h3>{votedBooks[0].genre}</h3>
          <h4>{votedBooks[0].votes} votes</h4>
        </div>

      }

      {(books && books.length > 0) &&
        <>
          <h1 className="title"> Recommendations for {genre} and {mood} </h1>


          <div id="recommendations-div">

            {books.map(function (book) {
              return (
                <div class="book-item">
                  <h2>{book.title}</h2>
                  <h3>{book.author}</h3>
                  <img src={book.image}></img>
                  <h3>{book.genre}</h3>
                  <h4>{book.votes} votes</h4>
                  <button onClick={() => callForVoting(book.title)}> Vote me! </button>
                </div>
              )
            })
            }
          </div>
        </>
      }

      {(mostVotedBooks && mostVotedBooks.length > 0) &&
        <>
          <h1 className="title"> These are the Most Voted Books today </h1>


          <div id="most-voted-div">

            {mostVotedBooks.map(function (book) {
              return (
                <div class="book-item">
                  <h2>{book.title}</h2>
                  <h3>{book.author}</h3>
                  <img src={book.image}></img>
                  <h3>{book.genre}</h3>
                  <h4>{book.votes} votes</h4>
                  <button onClick={() => callForVoting(book.title)}> Vote me! </button>
                </div>
              )
            })
            }
          </div>
        </>
      }
    </>
  )
}

export default GetInspired;