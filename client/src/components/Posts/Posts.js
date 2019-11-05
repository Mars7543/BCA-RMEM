import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions'
import PropTypes from 'prop-types'
import Post from './Post'

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts()
        window.scrollTo(0, 0)
    }

    render() {
        return ( 
            <main className="main">
                <div className="main__header">
                    <h1 className="main__header__title">Welcome to BCA RMEM</h1>
                    <h3 className="main__header__subtitle">News and Current Events about Middle Eastern Minorities</h3>
                </div>

                <div className="main__posts">
                    {this.props.posts && this.props.posts.map(post => {
                        if (post.user.username === "migbob20") // don't display test posts in production
                            return (process.env.NODE_ENV === 'development') 
                                    ? <Post key={post._id} post={post} /> 
                                    : null

                        return <Post key={post._id} post={post} />
                    })}
                </div>
            </main>
         )
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.post.posts
})

export default connect(mapStateToProps, { getPosts })(Posts)