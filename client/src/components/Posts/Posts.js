import axios from 'axios'
import React, { Component } from 'react'
import Post from './Post'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    componentDidMount() {
        axios.get('/api/posts')
            .then(res => this.setState(_ => ({ posts: res.data })))
            .catch(err => console.log(err))
    }

    render() {
        return ( 
            <main className="main">
                <div className="main__header">
                    <h1 className="main__header__title">Welcome to BCA RMEM</h1>
                    <h3 className="main__header__subtitle">News and Current Events about Middle Eastern Minorities</h3>
                </div>

                <div className="main__posts">
                    {this.state.posts && this.state.posts.map(post => 
                        <Post key={post._id} post={post} />
                    )}
                </div>
            </main>
         )
    }
}
 
export default Posts