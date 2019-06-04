import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Search</NavLink>
          </li>
          <li>
            <NavLink to="/notes">Notes</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
