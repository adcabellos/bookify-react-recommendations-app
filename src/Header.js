import './Header.css';
import {Link } from "react-router-dom"



function Header() {

   
    return (
        <>
        <header id="main-header">
            <div className="desktop-wrapper">
                <h2 className="logo-title">BOOKIFY</h2>
                    <nav>
                        <ul className="menu">
                            <li><Link to="/access" className="actual-page" id="inicio" >HOME</Link></li>
                            <li><Link to="/recommend" id="altas">RECOMMEND</Link></li>
                            <li><Link to="/getinspired">GET INSPIRED</Link></li>
                            <li><Link to="/access">LOGIN</Link></li> 
                            <li><button onClick={logout}>LOGOUT</button></li> 

                        </ul>  
                        </nav>                   
                    </div>
    </header>
        </>
    )
}

function logout(){
    localStorage.removeItem('user')
    window.location.href = '/access';
}

export default Header;