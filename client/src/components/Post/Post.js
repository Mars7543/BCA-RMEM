import React, { Component } from 'react'
import { getPost } from '../../actions/postActions'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types';
class Post extends Component {
    static propTypes = {
        post: PropTypes.object,
        getPost: PropTypes.func.isRequired
    }

    componentDidMount() {
        console.log(this.props)
        this.props.getPost(this.props.match.params.id)
    }

    formatPostDate() {
        const m = moment(this.props.post.postDate)

        let day = m.format('DD')
        if (day[0] === '0') day = day[1]
        
        let date = `${m.format('MMM')} ${day}`

        const year = m.format('YYYY')
        const curYear = moment(Date.now()).format('YYYY')
        if (year !== curYear) date += (', ' + year)
        
        return date
    }

    render() {
        if (this.props.post) {
            const { title, body, image, user: { username } } = this.props.post
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
                        
                        <div className="full_post__body">
                            { body.split('\n').map((paragraph, i) => 
                                <p className="full_post__paragraph" key={i}>{ paragraph }</p>
                            )}
                        </div>
                    </div>
                </div>
            )
        }

        return null
    }
}

const mapStateToProps = state => ({
    post: state.post.post
})

export default connect(mapStateToProps, { getPost })(Post)