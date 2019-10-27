import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import Posts from './components/Posts/Posts'
import Post from './components/Post/Post'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import Create from './components/Create'
import About from './components/About'

class App extends Component {
    render() { 
        return ( 
            <Provider store={store}>
                <Router>
                        <Header />
                            <Route path="/" exact={true} component={Posts} />
                            <Route path="/posts" exact={true} component={Posts} />
                            <Route path="/posts/:id" exact={true} component={Post} />
                            
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/logout" component={Logout} />

                            <Route path="/create" component={Create} />

                            <Route path="/about" component={About} />
                        <Footer />
                </Router>
            </Provider>
        );
    }
}

export default App