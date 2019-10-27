import axios from 'axios'
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types'

// Check Token & Load User
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING })
    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => 
            dispatch({ type: USER_LOADED, payload: res.data })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: AUTH_ERROR })
        })
}

export const register = user => dispatch => {
    const config = { headers: { 'Content-type': 'application/json' } }
    const body = JSON.stringify(user)

    axios
        .post('/api/users', body, config)
        .then(res => 
            dispatch({ 
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({ type: REGISTER_FAIL })
        })
}

export const login = user => dispatch => {
    const config = { headers: { 'Content-type': 'application/json' } }
    const body = JSON.stringify(user)

    axios
        .post('/api/auth', body, config)
        .then(res => 
            dispatch({ 
                type: LOGIN_SUCCESS, 
                payload: res.data 
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({ type: LOGIN_FAIL })
        })
}

export const logout = () => ({
    type: LOGOUT_SUCCESS
})

export const tokenConfig = getState => {
    // Get Token From LocalStorage
    const token = getState().auth.token
    const config = { headers: { 'Content-type': 'application/json' } }

    if (token) config.headers['x-auth-token'] = token

    return config
}