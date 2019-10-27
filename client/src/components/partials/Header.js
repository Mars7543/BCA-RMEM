import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { loadUser } from '../../actions/authActions'
import PropTypes from 'prop-types';

class Header extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        loadUser: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    componentDidMount() {
        this.props.loadUser()
    }

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
                        { this.props.isAuthenticated 
                            
                        ? 
                            <div>
                                <Link to="/create" className="nav__item">Create</Link>
                                <Link to="/logout" className="nav__item">Logout { `(${this.props.user.username})` }</Link>
                            </div>
                            
                        :
                            <div>
                                <Link to="/login" className="nav__item">Login</Link>
                                <Link to="/register" className="nav__item">Register</Link>
                            </div>
                        }
                        
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, { loadUser })(Header);