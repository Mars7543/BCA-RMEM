import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Post = ({ post: { _id: id, image, user, postDate, title, body } }) => {
    const formatDate = () => {
        const m = moment(postDate)

        let day = m.format('DD')
        if (day[0] === '0') day = day[1]
        
        let date = `${m.format('MMM')} ${day}`

        const year = m.format('YYYY')
        const curYear = moment(Date.now()).format('YYYY')
        if (year !== curYear) date += (', ' + year)
        
        return date
    }
    
    return (  
        <div className="post">
            <Link to={`/posts/${id}`}><img src={image} alt="" className="post__img"/></Link>
            
            <div className="post__content">
                <div className="post__info">
                    <i className="post__info__icon material-icons">account_circle</i>
                    <div className="post__info__container">
                        <p className="post__info__container__creator">{user.username}</p>
                        <p className="post__info__container__date">
                            {formatDate()}
                        </p>
                    </div>
                </div>

                <div className="post__body">
                    <Link to={`/posts/${id}`} className="post__body__title">{title}</Link>
                    <p className="post__body__content">{body}</p>
                </div>
            </div>
        </div>
    );
}
 
export default Post;