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
        const m = moment(this.state.post.postDate)

        let day = m.format('DD')
        if (day[0] === '0') day = day[1]
        
        let date = `${m.format('MMM')} ${day}`

        const year = m.format('YYYY')
        const curYear = moment(Date.now()).format('YYYY')
        if (year !== curYear) date += (', ' + year)
        
        return date
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
                        
                        { body.split('\n').map((paragraph, i) => 
                            <p className="full_post__body" key={i}>{ paragraph }</p>
                        )}
                    </div>
                </div>
            )
        }

        return null
    }
}
 
export default Post