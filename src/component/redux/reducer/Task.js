import {FETCH_CLICKED_TASK, FETCH_TASK_SUCCESS} from '../action/Task'

const initialState = {
    tasks: [],
    clickedTask: {id: 0, title: '', description: ''}
};

const task = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASK_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
            };
        case FETCH_CLICKED_TASK:
            return {
                ...state,
                clickedTask: action.payload,
            };
        default:
            return state;
    }
}

export default task