import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
class Register extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    state = { 
        error: '',
        redirect: false 
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props

        if (error !== prevProps.error) 
            if (error.id === 'REGISTER_FAIL')
                this.setState(() => ({ error: error.msg }))
        
        if (isAuthenticated)
            this.setState(() => ({ redirect: true }))
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    handleSubmit = e => {
        e.preventDefault()

        const firstName = e.target[0].value
        const lastName = e.target[1].value

        const email = e.target[2].value

        const username = e.target[3].value
        const password = e.target[4].value

        const name = `${firstName} ${lastName}`

        this.props.register({ name, email, username, password })
    }

    render() { 
        return (
            <div className="register">
                { this.state.redirect && <Redirect to='/' /> }
                <h1 className="register__header">Register</h1>
                <form className="register__form" onSubmit={this.handleSubmit}>
                    { this.state.error && <p className="register__form_error">{this.state.error}</p> }
                    <div className="register__form-group-container">
                        <div className="register__form-subgroup">
                            <label className="register__label" htmlFor="first-name">First Name</label>
                            <input className="register__input" id="first-name" type="text" placeholder="Enter First Name..."/>
                        </div>

                        <div className="register__form-subgroup">
                            <label className="register__label" htmlFor="last-name">Last Name</label>
                            <input className="register__input" id="last-name" type="text" placeholder="Enter Last Name..."/>
                        </div>
                    </div>

                    <div className="register__form-group">
                        <label className="register__label" htmlFor="email">Email</label>
                        <input className="register__input" id="email" type="text" placeholder="Enter Email..."/>
                    </div>

                    <div className="register__form-group-container">
                        <div className="register__form-subgroup">
                            <label className="register__label" htmlFor="username">Username</label>
                            <input className="register__input" id="username" type="text" placeholder="Enter Username..."/>
                        </div>

                        <div className="register__form-subgroup">
                            <label className="register__label" htmlFor="password">Password</label>
                            <input className="register__input" id="password" type="password" placeholder="Enter Password..."/>
                        </div>
                    </div>

                    <button className="register__btn">Register</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register)