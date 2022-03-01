import React from "react";
import { Link } from "react-router-dom";

function NavigationMenu(props) {
  return (
    <header className="navigation__reel-wrapper">
      <div className="reel__logo-container">Logo</div>
      <nav>
        <ul>
          <li>
            <Link to={{ pathname: "https://johnpaesano.com/" }} target="_blank">
              JohnPaesano.com
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "https://johnpaesano.com/#about" }}
              target="_blank"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "https://johnpaesano.com/#projects" }}
              target="_blank"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "https://johnpaesano.com/#news" }}
              target="_blank"
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "https://johnpaesano.com/#discography" }}
              target="_blank"
            >
              Discography
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "https://johnpaesano.com/#contact" }}
              target="_blank"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationMenu;
