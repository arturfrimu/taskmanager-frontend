import HTTPService from '../../../service/HTTPService';
import {getUserDetailsById} from "./User";

export const FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS";
export const FETCH_TEAM_TASKS = "FETCH_TEAM_TASKS";
export const FETCH_TEAM_FAILURE = "FETCH_TEAM_FAILURE";
export const FETCH_TEAM_USERS = "FETCH_TEAM_USERS";

const fetchTeamSuccess = (teams) => {
    return {
        type: FETCH_TEAM_SUCCESS,
        payload: teams
    };
};

const fetchTeamTasks = (id) => {
    return {
        type: FETCH_TEAM_TASKS,
        payload: id
    };
};

const fetchTeamUsers = (id) => {
    return {
        type: FETCH_TEAM_USERS,
        payload: id
    };
};

const fetchTeamFailure = (error) => {
    return {
        type: FETCH_TEAM_FAILURE,
        payload: error
    };
};

export const fetchTeamTasksHandler = (id) => {
    return dispatch => {
        HTTPService.getInfo("/teams/tasks/" + id)
            .then((res) => {
            dispatch(fetchTeamTasks(res.data));
        }).catch((err) => {
            dispatch(fetchTeamFailure(err.message));
        })
    }
}

export const fetchTeamUsersHandler = (id) => {
    return dispatch => {
        HTTPService.getInfo("/teams/users/" + id)
            .then((res) => {
                dispatch(fetchTeamUsers(res.data));
            }).catch((err) => {
            dispatch(fetchTeamFailure(err.message));
        })
    }
}

export const fetchTeams = () => {
    return dispatch => {
        HTTPService.getInfo("teams/").then((res) => {
            dispatch(fetchTeamSuccess(res.data));
        }).catch((err) => {
            dispatch(fetchTeamFailure(err.message));
        })
    }
}

export const addTaskToTeam = (task, id) => {
    return dispatch => {
        HTTPService.putInfo("/teams/addTask/" + id, task)
            .catch((err) => {
                dispatch(fetchTeamFailure(err.message));
            })
    }
}

export const addUserToTeam = (user, teamName) => {
    return dispatch => {
        HTTPService.putInfo("/user/addUser/" + teamName, user)
            .then(() =>
                dispatch(getUserDetailsById(user.id)))
            .catch((err) => {
                dispatch(fetchTeamFailure(err.message));
            })
    }
}

export const createTeam = (team) => {
    return dispatch => {
        HTTPService.postInfo("/teams", team)
            .then(() =>
                dispatch(fetchTeams()))
            .catch((err) => {
                dispatch(fetchTeamFailure(err.message));
            })
    }
}