import {FETCH_ROLES_FAILURE, FETCH_ROLES_SUCCESS} from '../action/Role';

const initialState = {
    roles: [],
    error: {}
};

const role = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload
            };
        case FETCH_ROLES_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default role