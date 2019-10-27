import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'

class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    state = { redirect: false }

    componentDidMount() {
        this.props.logout()
        this.setState(() => ({ redirect: true }))
    }

    state = { redirect: false }
    render() { 
        return (
            <div>
                { this.state.redirect && <Redirect to='/' /> } 
            </div>
        )
    }
}

export default connect(null, { logout })(Logout)