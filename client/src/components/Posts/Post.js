import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Post = ({ post: { _id: id, image, user, postDate, title, body } }) => {
    return (  
        <div className="post">
            <Link to={`/posts/${id}`}><img src={image} alt="" className="post__img"/></Link>
            
            <div className="post__content">
                <div className="post__info">
                    <i className="post__info__icon material-icons">account_circle</i>
                    <div className="post__info__container">
                        <p className="post__info__container__creator">{user.username}</p>
                        <p className="post__info__container__date">
                            {moment(postDate).fromNow()}
                        </p>
                    </div>
                </div>

                <div className="post__body">
                    <Link to={`/posts/${id}`} className="post__body__title">{title}</Link>
                    <p className="post__body__content">{body}</p>
                </div>

                <hr className="post__divider" />

                <div className="post__extra">
                    <div className="post__extra__views">
                        0 views
                    </div>
                    <div className="post__extra__comment">
                        Write a comment
                    </div>
                    <div className="post__extra__likes">
                        <i className="material-icons">favorite_border</i>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Post;