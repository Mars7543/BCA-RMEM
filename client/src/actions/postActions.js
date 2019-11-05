import axios from 'axios'
import { GET_POSTS, GET_POST, ADD_POST, EDIT_POST, DELETE_POST, POSTS_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

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
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'POST_FETCH_FAIL')))
}

export const getPost = id => dispatch => {
    dispatch(setPostsLoading)
    axios
        .get(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'POST_FETCH_FAIL')))
}

export const addPost = post => (dispatch, getState) => {
    axios
        .post('/api/posts', post, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })    
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'POST_CREATE_FAIL')))
}

export const editPost = (id, post) => (dispatch, getState) => {
    axios
        .put(`/api/posts/${id}`, post, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_POST,
                payload: res.data
            })    
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'POST_EDIT_FAIL')))
}

export const deletePost = id => (dispatch, getState) => {
    axios
        .delete(`/api/posts/${id}`, tokenConfig(getState))
        .then(() =>
            dispatch({
                type: DELETE_POST,
                payload: { _id: id }
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'POST_DELETE_FAIL')))
}

export const setPostsLoading = () => ({
    type: POSTS_LOADING
})