import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost, editPost } from '../actions/postActions'
import PropTypes from 'prop-types';

export class Edit extends Component {
    static propTypes = {
        getPost: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired,
        actionComplete: PropTypes.bool,
        post: PropTypes.object,
        error: PropTypes.string
    }
    
    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }

    handleSubmit = e => {
        e.preventDefault()

        const id = this.props.match.params.id
        const title = e.target[0].value
        const image = e.target[1].value
        const body = e.target[2].value

        this.props.editPost(id, { title, image, body })
    }

    render() {
        if (this.props.post)
            return (
                    <div className="create">
                    { this.props.actionComplete && <Redirect to='/' /> }
                    
                    <h1 className="create__header">Edit Article</h1>
                    
                    <form className="create__form" onSubmit={this.handleSubmit}>
                        { this.props.error && <p className="register__form_error">{this.props.error}</p> }
                        <div className="create__form-group">
                            <label className="create__label" htmlFor="title">Title</label>
                            <input className="create__input" id="title" type="text" placeholder="Enter Title..." defaultValue={this.props.post.title}/>
                        </div>

                        <div className="create__form-group">
                            <label className="create__label" htmlFor="image">Image</label>
                            <input className="create__input" id="image" type="text" placeholder="Paste an Image Link..." defaultValue={this.props.post.image}/>
                        </div>

                        <div className="create__form-group">
                            <label className="create__label" htmlFor="title">Body</label>
                            <textarea 
                                id="body" 
                                className="create__textarea" 
                                placeholder="Type Your Article..."
                                defaultValue={this.props.post.body}
                                rows="5"
                                cols="10"
                            >
                            </textarea>
                        </div>

                        <button className="create__btn">Update</button>
                    </form>
                </div>
            )
        return null
    }
}

const mapStateToProps = state => ({
    post: state.post.post,
    error: state.auth.error,
    actionComplete: state.post.actionComplete
})
export default connect(mapStateToProps, { getPost, editPost })(Edit)
