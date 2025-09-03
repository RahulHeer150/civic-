import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"; // Adjust the path based on your project structure
import logo from "../landing_page/logo.jpg"; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h1>Follow Us and Stay Inspired!</h1>
        <a
          href="https://linkedin.com"
          className="footer-social-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <img
            src={logo} // Replace with the actual logo URL
            alt="CrowdFix Logo"
            className="footer-logo-img"
          />
        </div>
        <div className="footer-copyright">
          CrowdFix.com &copy; 2024. All rights reserved.
        </div>
        <div className="footer-links">
          <Link to="#about" className="footer-link">About Us</Link>
          <Link href="#contact" className="footer-link">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;