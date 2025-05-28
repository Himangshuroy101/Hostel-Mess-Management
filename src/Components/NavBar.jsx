import { useState } from "react";
import './Style/NavBar.css';
import logo from '../assets/images/Logo.jpg';
import {Link} from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
      <div className="logo-container">
        <div className="logo">
        <img src={logo} alt="logo" height={55} width={55}/>
        </div>
        <div className="navHeading">
            <a className="headingName" href="#">Radhakrishnan Bhawan</a>
            <a className="subHeading">B.T Mens Hall</a>
        </div>
     </div>
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Committee</a>
          <a href="#">Gallery</a>
          <a href="#">Contributors</a>
          <div className="buttons">
            <button className="login">Login</button>
            <button className="signup">  Sign Up / Register</button>
          </div>
        </div>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </div>
      </div>
    </nav>
  );
}
