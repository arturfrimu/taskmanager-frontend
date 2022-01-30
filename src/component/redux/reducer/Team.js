import {FETCH_TEAM_TASKS, FETCH_TEAM_SUCCESS, FETCH_TEAM_USERS} from '../action/Team'

const initialState = {
    teams: [],
    tasks: [],
    users: []
};

const team = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TEAM_SUCCESS:
            return {
                ...state,
                teams: action.payload,
            };
            case FETCH_TEAM_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        case FETCH_TEAM_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
}

export default team