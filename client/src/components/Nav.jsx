import React from 'react';

const Nav = () => {
  return (
    <ul className="nav-links">
      <li>
        <a href="#">
          <i className="fas fa-home" />
          <span className="navlink">Home</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i className="fas fa-calendar-check" />
          <span className="navlink">To-do</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i className="fas fa-graduation-cap" />
          <span className="navlink">All Project</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i className="fas fa-cog" />
          <span className="navlink">Settings</span>
        </a>
      </li>
    </ul>
  );
};

export default Nav;
