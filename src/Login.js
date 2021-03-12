import React, { useState } from 'react';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("")

  function isEmpty() {
    if (!username || !password){
      alert("Please, do not leave empty fields!")
    }
  }

  function callAPI() {
    isEmpty()

    let objectUser = { "email": username, "password": password };

    let fetchData = {
      method: "POST",
      body: JSON.stringify(objectUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }

    fetch("http://localhost:9000/access/login", fetchData)
      .then(res => res.json())
      .then(data => {
        setUser(data.userEmail)
        localStorage.setItem("user", username)
        window.location.href = '/recommend'
      })

  }

  return (
    <>
      <div className="login-div">

        <h2 className="white-title"> Log in to access to Bookify</h2>

        <label className="white-title" htmlFor="email">Email</label>
        <input type="text" id="email-login" placeholder="enter your email adress" value={username} onChange={event => setUsername(event.target.value)}/>

        <label className="white-title" htmlFor="password">Password </label>
        <input type="password" id="password-login" placeholder="enter your password" value={password} onChange={event => setPassword(event.target.value)}/>


        <button className="bold" id="button-login" type="submit" onClick={callAPI}>ACCESS</button>


      </div>


    </>
  )
}

export default Login; 