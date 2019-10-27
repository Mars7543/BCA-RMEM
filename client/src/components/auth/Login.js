import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

import PropTypes from 'prop-types'

class Login extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    state = { 
        error: '',
        redirect: false 
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props

        if (prevProps.error !== error)
            if (error.id === 'LOGIN_FAIL')
                this.setState(() => ({ error: error.msg }))

        if (isAuthenticated)
            this.setState(() => ({ redirect: true }))
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    handleSubmit = e => {
        e.preventDefault()

        const username = e.target[0].value
        const password = e.target[1].value

        this.props.login({ username, password })
    }

    render() { 
        return (
            <div className="login">
                { this.state.redirect && <Redirect to='/' /> }
                <h1 className="login__header">Login</h1>
                <form className="login__form" onSubmit={this.handleSubmit}>
                    { this.state.error && <p className="create__form_error">{this.state.error}</p> }

                    <div className="login__form-container">
                        <div className="login__form-group">
                            <label className="login__label" htmlFor="username">Username</label>
                            <input className="login__input" id="username" type="text" placeholder="Enter Username..."/>
                        </div>

                        <div className="login__form-group">
                            <label className="login__label" htmlFor="password">Password</label>
                            <input className="login__input" id="password" type="password" placeholder="Enter Password..."/>
                        </div>
                    </div>

                    <button className="login__btn">Login</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, { login, clearErrors })(Login)