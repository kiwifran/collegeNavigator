import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
        <nav className="nav">
          <div className="wrapper">
            <NavLink to="/" className="navLink"><h1>College Navigator</h1></NavLink>
            <ul className="navList">
              <li className="navItem"><NavLink to="/" className="navLink">Search</NavLink></li>
              <li className="navItem"><NavLink to="/notes" className="navLink">Bookmarks</NavLink></li>
            </ul>
            
            <ul className="hiddenNavList">
            <li className="navItem"><NavLink to="/" className="navLink" aria-label="search"><i className="fas fa-search"></i></NavLink></li>
            <li className="navItem"><NavLink to="/notes" className="navLink"><i className="fas fa-clipboard-list"></i></NavLink></li>
            </ul>
          </div>
        </nav>
    </header>
  )
}

export default Nav
