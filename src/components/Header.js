import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(){
    return(
        <header>
        <nav className="nav">
        <NavLink className='link' activeclassname='active' exact='true' to='/'>
        <li>
            Popular
        </li>
        </NavLink>
        <NavLink className='link' activeclassname='active' to='/Battle'>
        <li>
            Battle
        </li>
        </NavLink>
        </nav>
        </header> 
    )
}

export default Header;