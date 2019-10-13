import React, { Component } from 'react'

import Header from './components/Header'
import Posts from './components/Posts'
import Footer from './components/Footer'

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Header />
                <Posts />
                <Footer />
            </div>
        );
    }
}
 
export default App