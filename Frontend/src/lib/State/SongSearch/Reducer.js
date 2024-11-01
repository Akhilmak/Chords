import { FETCH_SONGS_REQUEST, FETCH_SONGS_SUCCESS, FETCH_SONGS_ERROR } from "./ActionTypes"

const initialState = {
    songsList:[],
    error: null,
    loading: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SONGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SONGS_SUCCESS:
            return {
                ...state,
                loading: false,
                songsList: action.payload
            }
        case FETCH_SONGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default searchReducer;