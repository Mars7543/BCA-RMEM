import { GET_POSTS, GET_POST, ADD_POST, EDIT_POST, POSTS_LOADING, DELETE_POST } from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: false,
    actionComplete: false
}

export default function(state=initialState, { type, payload }) {
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                actionComplete: false
            }

        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
                actionComplete: false
            }

        case ADD_POST:
            return {
                ...state,
                post: payload,
                actionComplete: true
            }
        
        case EDIT_POST:
            return {
                ...state,
                actionComplete: true
            }
        
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload._id),
                post: payload
            }

        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}
