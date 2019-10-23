import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Create extends Component {
    state = { 
        config: {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWUwOGJkNTA4OTg3MmMxNzQwMmE2YSIsImlhdCI6MTU3MTY4NjU4OX0.aY4E4OMXs4Cvdz4moy1cjzfZvmHbWL7zh4JbOi73djI'
            },
            error: '',
            redirect: false
        }
    }
    
    handleSubmit = e => {
        e.preventDefault()

        const title = e.target[0].value
        const image = e.target[1].value
        const body = e.target[2].value

        if (!title || !image || !body) return this.setState(() => ({ error: 'Please Fill Out All Fields.' }))

        axios.post('/api/posts', { title, image, body }, this.state.config)
        .then(() => 
            this.setState(() => ({ error: '', redirect: true }))
        )
        .catch(err => {
            console.log(err) 
            this.setState(() => ({ error: err.response.data.msg }))
        })
    }
    
    render() { 
        return (
            <div className="create">
                { this.state.redirect && <Redirect to='/' /> }

                <h1 className="create__header">Create an Article</h1>
                
                <form className="create__form" onSubmit={this.handleSubmit}>
                    { this.state.error && <p className="register__form_error">{this.state.error}</p> }
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
 
export default Create