import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
        <nav className="nav">
          <div className="wrapper">
            <NavLink to="/" className="navLink" tabIndex='1'><h1>College Navigator</h1></NavLink>
            <ul className="navList">
            <li className="navItem"><NavLink to="/" className="navLink" tabIndex='2'>Search</NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink" tabIndex='3'>Bookmarks</NavLink></li>
            </ul>
            <ul className="hiddenNavList">
            <li className="navItem"><NavLink to="/" className="navLink" aria-label="search" tabIndex='2'><i class="fas fa-search"></i></NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink" tabIndex='3'><i class="fas fa-clipboard-list"></i></NavLink></li>
            </ul>
          </div>
        </nav>
    </header>
  )
}

export default Nav
