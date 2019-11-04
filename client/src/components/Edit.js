import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost, editPost } from '../actions/postActions'
import PropTypes from 'prop-types';

export class Edit extends Component {
    static propTypes = {
        getPost: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = { id: props.match.params.id }
    }

    render() {
        return (
                <div className="create">
                { this.props.createdPost && <Redirect to='/' /> }
                
                <h1 className="create__header">Create an Article</h1>
                
                <form className="create__form" onSubmit={this.handleSubmit}>
                    { this.props.error && <p className="register__form_error">{this.props.error}</p> }
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

export default connect(null, { getPost, editPost })(Edit)
