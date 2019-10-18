import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class Post extends Component {
    constructor(props) {
        super(props)

        const id = props.match.params.id;

        this.state = {
            id
        }
    }

    componentDidMount() {
        axios.get(`/api/posts/${this.state.id}`)
        .then(post => 
            this.setState(() => ({ post: post.data })
        ))
        .catch(err => console.log(err))
    }

    formatPostDate() {
        const date = moment(this.state.post.postDate)
        const year = date.format("YYYY")
        
        if (year === "2019") return date.format("MMM DD")
        return date.format("MMM DD, YYYY")
    }

    render() {
        if (this.state.post) {
            const { title, body, image, user: { username } } = this.state.post
            return (
                <div className="full_post__main">
                    <div className="full_post">
                        <h1 className="full_post__title">{title}</h1>

                        <div className="full_post__info">
                            <i className="full_post__info__icon material-icons">account_circle</i>
                            <div className="full_post__info__container">
                                <p className="full_post__info__container__creator">{username}</p>
                                <p className="full_post__info__container__date">
                                    { this.formatPostDate() }
                                </p>
                            </div>
                        </div>

                        <img className="full_post__image" src={image} alt="" />
                        <p className="full_post__body">{body}</p>
                    </div>
                </div>
            )
        }

        return null
    }
}
 
export default Post