import {
    FETCH_USER_SUCCESS,
    FETCH_USERINFO_SUCCESS,
    FETCH_USERDTO_SUCCESS,
    FETCH_USER_FAILURE,
    SEARCHED_USERS
} from '../action/User';

const initialState = {
    users: [],
    searchedUsers: [],
    user: {},
    userDetail: {},
    error: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                users: action.payload
            };
        case SEARCHED_USERS:
            return {
                ...state,
                searchedUsers: action.payload
            };
        case FETCH_USERINFO_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case FETCH_USERDTO_SUCCESS:
            return {
                ...state,
                userDetail: action.payload
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default user