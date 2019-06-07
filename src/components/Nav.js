import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
      <div className="container">
        <nav className="nav">
          <NavLink to="/" className="navLink">College Navigator</NavLink>
          <ul className="navList">
            <li className="navItem"><NavLink to="/" className="navLink">Search</NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink">Notes</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Nav
