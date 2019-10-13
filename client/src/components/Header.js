import React, { Component } from 'react';

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
                    <ul className="nav__items">
                        <li className="nav__item">Home</li>
                        <li className="nav__item">Blog</li>
                        <li className="nav__item">Contact</li>
                    </ul>
                </nav>
            </div>
        );
    }
}
 
export default Header;