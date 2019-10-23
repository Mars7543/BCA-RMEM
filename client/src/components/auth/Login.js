import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    state = { 
        error: '',
        redirect: false 
    }

    handleSubmit = e => {
        e.preventDefault()

        const username = e.target[0].value
        const password = e.target[1].value

        if (!username || !password)
            return this.setState(() => ({ error: 'Please Fill Out All Fields.' }))

        axios.post('/api/auth', {
            username,
            password
        })
        .then(res => {
            console.log(res)
            this.setState(() => ({ redirect: true }))
        })
        .catch(err => {
            console.log(err) 
            this.setState(() => ({ error: err.response.data.msg }))
        })
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
 
export default Login