import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__redes">
        <ul className="footer__redes-wrapper">
          <li>
            <a href="https://www.linkedin.com/in/vinit-sheetal" className="footer__link">
              <i className="fab fa-facebook-f"></i>
              Linked-In
            </a>
          </li>
          <li>
            <a href="https://github.com/WIZARD3022" className="footer__link">
              <i className="fab fa-twitter"></i>
              Github
            </a>
          </li>
          <li>
            <a href="https://www.hackerrank.com/profile/vinitsheetal15" className="footer__link">
              <i className="fab fa-instagram"></i>
              Hacker-Rank
            </a>
          </li>
        </ul>
      </div>
      <div className="separador"></div>
      <p className="footer__texto"><b>Copyright @ 2024 <br /> Designer: VINIT SHEETAL</b></p>
    </footer>
  );
};

export default Footer;
