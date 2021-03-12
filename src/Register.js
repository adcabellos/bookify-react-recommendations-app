import React, { useState } from 'react';

function Register() {

    const [userNameRegister, setuserNameRegister] = useState("");
    const [userMailRegister, setuserMailRegister] = useState("");
    const [passwordRegister, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    function isEmpty() {
        if (!userNameRegister || !userMailRegister || !passwordRegister || !secondPassword){
          alert("Please, do not leave empty fields!")
        }
      }


    function callAPI() {
        isEmpty()

        let userObject = { "name": userNameRegister, "email": userMailRegister, "password": passwordRegister };

        if (passwordRegister === secondPassword) {

            let fetchData = {
                method: "POST",
                body: JSON.stringify(userObject),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            }

            fetch("http://localhost:9000/access/register", fetchData)
                .then(res => res.json())
                // .then(data => setApiResponse(data))
                .then(data => {
                    console.log(data);
                    alert(data[0].message);
                    clearFormFields();
                })

        } else {
            // <p>Error. Las contraseñas no coinciden </p>
            alert("¡Error! Supplied passwords don't match")
        }
    }

    function clearFormFields() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('secondpassword').value = '';
    }

    return (
        <>
            <div className="register-div">

            <h2 className="white-title"> Register in to access to Bookify</h2>


                <label className="white-title" htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="enter your name" value={userNameRegister} onChange={({ target }) => setuserNameRegister(target.value)}/>

                <label className="white-title" htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="enter your email address" value={userMailRegister} onChange={({ target }) => setuserMailRegister(target.value)} />

                <label className="white-title" htmlFor="password">Your password </label>
                <input type="password" id="password" placeholder="enter a password" value={passwordRegister} onChange={({ target }) => setPassword(target.value)} />

                <label className="white-title" htmlFor="second-password">Repeat your password </label>
                <input type="password" id="secondpassword" placeholder="repeat the password" value={secondPassword} onChange={({ target }) => setSecondPassword(target.value)} />

                <div id="error-contraseña"> </div>

                <button className="bold" id="button-alta" type="submit" onClick={callAPI}>REGISTER</button>
            </div>
        </>
    )


}

export default Register; 