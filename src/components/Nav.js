import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
<<<<<<< HEAD
        <nav className="nav wrapper">
        <NavLink to="/" className="navLink" tabIndex='1'><h1>College Navigator</h1></NavLink>
          <ul className="navList">
            <li className="navItem"><NavLink to="/" className="navLink" tabIndex='2'>Search</NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink" tabIndex='3'>Bookmarks</NavLink></li>
          </ul>
=======
        <nav className="nav">
          <div className="wrapper">
            <NavLink to="/" className="navLink"><h1>College Navigator</h1></NavLink>
            <ul className="navList">
              <li className="navItem"><NavLink to="/" className="navLink">Search</NavLink></li>
              <li className="navItem"><NavLink to="/notes" className="navLink">Bookmarks</NavLink></li>
            </ul>
            <ul className="hiddenNavList">
            <li className="navItem"><NavLink to="/" className="navLink" aria-label="search"><i class="fas fa-search"></i></NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink"><i class="fas fa-clipboard-list"></i></NavLink></li>
            </ul>
          </div>
>>>>>>> master
        </nav>
    </header>
  )
}

export default Nav
