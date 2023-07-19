import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Navbar() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/myprofile">My Profile</Link>
            </li>
            <li className="mx-1">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <div className="flex-row">
            {/* Add your search bar component here */}
            {/* For example: */}
            <input type="text" placeholder="Search" />
          </div>
        </>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            {/* Link to the Signup page */}
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            {/* Link to the Login page */}
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="music">
            🎵
          </span>{" "}
          Musician's Corner
        </Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Navbar;