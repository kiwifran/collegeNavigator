import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
        <nav className="nav wrapper">
        <NavLink to="/" className="navLink" tabIndex='1'><h1>College Navigator</h1></NavLink>
          <ul className="navList">
            <li className="navItem"><NavLink to="/" className="navLink" tabIndex='2'>Search</NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink" tabIndex='3'>Bookmarks</NavLink></li>
          </ul>
        </nav>
    </header>
  )
}

export default Nav
