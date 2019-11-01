import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/postActions'
import PropTypes from 'prop-types';
import moment from 'moment'

class Post extends Component {
    static propTypes = {
        user: PropTypes.object
    }

    formatDate = () => {
        const m = moment(this.props.post.postDate)

        let day = m.format('DD')
        if (day[0] === '0') day = day[1]
        
        let date = `${m.format('MMM')} ${day}`

        const year = m.format('YYYY')
        const curYear = moment(Date.now()).format('YYYY')
        if (year !== curYear) date += (', ' + year)
        
        return date
    }

    handleDeletePost = () => {
        const { _id, title } = this.props.post

        const deletePost = window.confirm(`Are You Sure You Want To Delete This Post?\n"${title}"`)
        if (deletePost) this.props.deletePost(_id)
    }

    render() { 
        const { _id: id, image, user, title, body } = this.props.post
        return (  
            <div className="post">
                <Link to={`/posts/${id}`}><img src={image} alt="" className="post__img"/></Link>
                
                <div className="post__content">
                    <div className="post__info_actions__container">
                        <div className="post__info">
                            <i className="post__info__icon material-icons">account_circle</i>
                            <div className="post__info__container">
                                <p className="post__info__container__creator">{user.username}</p>
                                <p className="post__info__container__date">
                                    {this.formatDate()}
                                </p>
                            </div>
                        </div>

                        { user.username === this.props.user.username &&
                            <div className="post__actions">
                                <i onClick={this.handleDeletePost} className="post__info__icon-delete material-icons">delete</i>
                            </div>
                        }
                    </div>

                    <div className="post__body">
                        <Link to={`/posts/${id}`} className="post__body__title">{title}</Link>
                        <p className="post__body__content">{body}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { deletePost })(Post);