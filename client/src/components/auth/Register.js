import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
    state = { 
        error: '',
        redirect: false 
    }

    handleSubmit = e => {
        e.preventDefault()

        const firstName = e.target[0].value
        const lastName = e.target[1].value

        const email = e.target[2].value

        const username = e.target[3].value
        const password = e.target[4].value

        if (!firstName || !lastName || !email || !username || !password)
            return this.setState(() => ({ error: 'Please Fill Out All Fields' }))

        const name = `${firstName} ${lastName}`

        axios.post('/api/users', { 
            name,
            email,
            username,
            password
        })
        .then(res => {
            console.log(res)
            this.setState(() => ({ redirect: true }))
        })
        .catch(err => {
            console.log(err.response)
            this.setState(() => ({ error: err.response.data.msg }))
        })
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

                    <button className="register__btn">Login</button>
                </form>
            </div>
        );
    }
}
 
export default Register