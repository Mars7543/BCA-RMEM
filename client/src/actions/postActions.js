import axios from 'axios'
import { GET_POSTS, ADD_POST, POSTS_LOADING, SHOW_ERROR } from './types'

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading)
    axios
        .get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err => dispatch(showError(err.response.data.msg)))
}

export const addPost = post => dispatch => {
    const { title, image, body } = post

    if (!title || !image || !body) return dispatch(showError('Please Fill Out All Fields.'))

    const config = {
        headers: {
            'Content-type': 'application/json',
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWUwOGJkNTA4OTg3MmMxNzQwMmE2YSIsImlhdCI6MTU3MTY4NjU4OX0.aY4E4OMXs4Cvdz4moy1cjzfZvmHbWL7zh4JbOi73djI'
        }
    }

    axios
        .post('/api/posts', post, config)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })    
        )
        .catch(err => dispatch(showError(err.response.data.msg)))
}

export const setPostsLoading = () => ({
    type: POSTS_LOADING
})

export const showError = error => ({
    type: SHOW_ERROR,
    payload: error
})