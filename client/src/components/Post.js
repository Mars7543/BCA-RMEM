import React from 'react';
import moment from 'moment';

const Post = ({ post }) => {
    return (  
        <div className="post">
            <img src={post.image} className="post__img"/>
            
            <div className="post__content">
                <div className="post__info">
                    <i className="post__info__icon material-icons">account_circle</i>
                    <div className="post__info__container">
                        <p className="post__info__container__creator">{post.user.username}</p>
                        <p className="post__info__container__date">
                            {moment(post.postDate).fromNow()}
                        </p>
                    </div>
                </div>

                <div className="post__body">
                    <h1 className="post__body__title">{post.title}</h1>
                    <p className="post__body__content">{post.body}</p>
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