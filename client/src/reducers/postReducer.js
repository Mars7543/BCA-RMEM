import { GET_POSTS, ADD_POST, POSTS_LOADING, SHOW_ERROR } from '../actions/types'

const initialState = {
    posts: [],
    loading: false,
    createdPost: false,
    error: '',
}

export default function(state=initialState, { type, payload }) {
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                createdPost: false
            }

        case ADD_POST:
            console.log(payload)
            return {
                ...state,
                post: payload,
                createdPost: true
            }

        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }

        case SHOW_ERROR: 
            return {
                ...state,
                error: payload
            }

        default:
            return state
    }
}
