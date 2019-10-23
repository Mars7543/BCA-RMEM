import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <header>
                    <img className="header__img" src="https://iranprimer.usip.org/sites/default/files/u/4religions.jpg" alt="BCA RMEM Logo"/>
                    <div className="header__titles">
                        <h1 className="header__title">BCA Relief for Middle Eastern Minorities</h1>
                        <h3 className="header__subtitle">RMEM Club Blog</h3>
                    </div>
                </header>

                <nav>
                    <div className="nav__main_items">
                        <Link to="/posts" className="nav__item">Home</Link>
                        <Link to="/about" className="nav__item">About Us</Link>
                    </div>
                    <div className="nav__auth_items">    
                        <Link to="/login" className="nav__item">Login</Link>
                        <Link to="/register" className="nav__item">Register</Link>
                        
                        <Link to="/create" className="nav__item">Create</Link> { /** TODO: Make this a FAB - Materialize */}
                    </div>
                </nav>
            </div>
        );
    }
}
 
export default Header;