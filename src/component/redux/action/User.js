import HTTPService from '../../../service/HTTPService';

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USERINFO_SUCCESS = "FETCH_USERINFO_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_USERDTO_SUCCESS = "FETCH_USERDTO_SUCCESS";
export const SEARCHED_USERS = "CHANGE_USERS";
export const LOGIN_URL = "/auth/login";
export const REGISTRATION_URL = "/auth/registry";


const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    };
};

const searchUsers = (users) => {
    return {
        type: SEARCHED_USERS,
        payload: users
    };
};

const fetchUserDetailsSuccess = (user) => {
    return {
        type: FETCH_USERDTO_SUCCESS,
        payload: user
    };
};

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    };
};

export const getUserDetailsById = (id) => {
    return dispatch => {
        HTTPService.getInfoWithDetails(id)
            .then(res => {
                dispatch(fetchUserFailure({}));
                res && dispatch(fetchUserDetailsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchUserFailure(err));
            })
    }
}

export const searchUserHandler = (user) => {
    return dispatch => {
        dispatch(searchUsers(user));
    }
}

export const auth = async (saveData, URL, authContext, history) => {
    try {
        const response = await HTTPService.postInfo(URL, saveData)
        const expirationTime = new Date(new Date().getTime() + (response.data.expirationToken * 1000))
        authContext.login(response.data.token, expirationTime.toISOString(), response.data.role, response.data.username);
        history.replace('/users');
    } catch (e) {
        if (e?.response?.status && e?.response?.status === 500) {
            alert("User already exists!")
        } else {
            alert("Invalid data")
        }
    }
}

export const fetchUsers = () => {
    return dispatch => {
        HTTPService.getInfo("users/").then((res) => {
            dispatch(fetchUsersSuccess(res.data));
        }).catch((err) => {
            dispatch(fetchUserFailure(err.message));
        })
    }
}

export const updateUser = (user) => {
    return dispatch => {
        HTTPService.putInfo("users/update", user)
            .then(() => {
                dispatch(fetchUsers());
            })
            .catch((err) => {
                dispatch(fetchUserFailure(err.message));
            })
    }
}

export const addTaskToUser = (task, id) => {
    return dispatch => {
        HTTPService.putInfo("/users/addTask/" + id, task)
            .then((res) => {
                dispatch(fetchUserDetailsSuccess(res.data))
            })
            .catch((err) => {
                dispatch(fetchUserFailure(err.message));
            })
    }
}

export const updateUserRole = (userId, user) => {
    return dispatch => {
        HTTPService.postInfo("/roles/update/" + userId, user)
            .then(() => {
                dispatch(getUserDetailsById(userId));
            })
            .catch((err) => {
                dispatch(fetchUserFailure(err.message));
            })
    }
}

export const deleteUserById = (id) => {
    return dispatch => {
        HTTPService.deleteInfo("/users/delete/id/" + id)
            .then(() =>
                dispatch(fetchUsers()))
            .catch((err) => {
                dispatch(fetchUserFailure(err.message));
            })
    }
}

export const createUser = (user) => {
    return dispatch => {
        HTTPService.postInfo("users", user)
            .then(() =>
                dispatch(fetchUsers()))
            .catch((err) => {
                dispatch(fetchUserFailure(err.message));
            })
    }
}

export const getUserDetailsByUsername = (username) => {
    return dispatch => {
        HTTPService.getInfo('users/userName/' + username)
            .then(res => {
                dispatch(fetchUserFailure({}));
                res && dispatch(fetchUserDetailsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchUserFailure(err));
            })
    }
}

