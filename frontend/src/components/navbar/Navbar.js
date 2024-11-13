import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { SiAnaconda } from "react-icons/si";
import Button from "../UI/Button/Button";
import "../UI/Button/Button.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"; // Adjust the path based on your file structure
import { signOut } from "firebase/auth"; // Import the signOut function

import "./Navbar.css";

const Navbar = ({ onLogout }) => { // Accept onLogout as a prop
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase signOut method
      onLogout(); // Call onLogout function passed from parent
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar container">
      <div className="logo">
        <SiAnaconda color="#fff" size={33} />
        <p className="logo-text">
          Sign<span>Ease</span>
        </p>
      </div>
      <menu>
        <ul
          className="nav-links"
          id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
        >
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#download">Download</a>
          </li>
          <li>
            <a href="#subscribe">Subscribe</a>
          </li>

          <li className="nav-btn">
            <Button text={"Learn More"} btnClass={"btn-dark btn-small"} href={"#faq"} />
          </li>
          {/* <li className="nav-btn">
            <button onClick={handleLogout} className="btn-dark btn-small">
              Logout
            </button>
          </li> */}
        </ul>
      </menu>
      <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? (
          <RiCloseLine color="#fff" size={30} />
        ) : (
          <AiOutlineBars color="#fff" size={27} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;