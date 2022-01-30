import HTTPService from '../../../service/HTTPService';

export const FETCH_TASK_SUCCESS = "FETCH_TASK_SUCCESS";
export const FETCH_CLICKED_TASK = "FETCH_CLICKED_TASK";
export const FETCH_TASK_FAILURE = "FETCH_TASK_FAILURE";

const fetchTaskSuccess = (tasks) => {
    return {
        type: FETCH_TASK_SUCCESS,
        payload: tasks
    };
};

const fetchTaskFailure = (error) => {
    return {
        type: FETCH_TASK_FAILURE,
        payload: error
    };
};

const fetchClickedTask = (task) => {
    return {
        type: FETCH_CLICKED_TASK,
        payload: task
    };
};

export const fetchTasks = () => {
    return dispatch => {
        HTTPService.getInfo("tasks/").then((res) => {
            dispatch(fetchTaskSuccess(res.data));
        }).catch((err) => {
            dispatch(fetchTaskFailure(err.message));
        })
    }
}

export const fetchUserTasks = (username) => {
    return dispatch => {
        HTTPService.getInfo("/tasks/" + username)
            .catch((err) => {
                dispatch(fetchTaskFailure(err.message));
        })
    }
}

export const fetchClickedTaskHandler = (task) => {
    return dispatch => {
        dispatch(fetchClickedTask(task))
    }
}

