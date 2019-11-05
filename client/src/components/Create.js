import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../actions/postActions'
class Create extends Component {
    static propTypes = {
        actionComplete: PropTypes.bool,
        error: PropTypes.object
    }

    handleSubmit = e => {
        e.preventDefault()

        const title = e.target[0].value
        const image = e.target[1].value
        const body = e.target[2].value

        this.props.addPost({ title, image, body })
    }
    
    render() { 
        return (
            <div className="create">
                { (this.props.actionComplete || ( this.props.error && this.props.error.msg === 'No token, authorization denied' )) && <Redirect to='/' /> }
                
                <h1 className="create__header">Create an Article</h1>
                
                <form className="create__form" onSubmit={this.handleSubmit}>
                    { this.props.error && <p className="register__form_error">{this.props.error.msg}</p> }
                    <div className="create__form-group">
                        <label className="create__label" htmlFor="title">Title</label>
                        <input className="create__input" id="title" type="text" placeholder="Enter Title..."/>
                    </div>

                    <div className="create__form-group">
                        <label className="create__label" htmlFor="image">Image</label>
                        <input className="create__input" id="image" type="text" placeholder="Paste an Image Link..."/>
                    </div>

                    <div className="create__form-group">
                        <label className="create__label" htmlFor="title">Body</label>
                        <textarea 
                            id="body" 
                            className="create__textarea" 
                            placeholder="Type Your Article..."
                            rows="5"
                            cols="10"
                        >
                        </textarea>
                    </div>

                    <button className="create__btn">Post</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    actionComplete: state.post.actionComplete,
    error: state.error   
})

export default connect(mapStateToProps, { addPost })(Create)