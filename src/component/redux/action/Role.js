import HTTPService from '../../../service/HTTPService';

export const FETCH_ROLES_SUCCESS = "FETCH_ROLES_SUCCESS";
export const FETCH_ROLES_FAILURE = "FETCH_ROLES_FAILURE";

const fetchRolesSuccess = (roles) => {
    return {
        type: FETCH_ROLES_SUCCESS,
        payload: roles
    };
};

const fetchRolesFailure = (error) => {
    return {
        type: FETCH_ROLES_FAILURE,
        payload: error
    };
};

export const fetchRoles = () => {
    return dispatch => {
        HTTPService.getInfo("/roles/")
            .then((res) => {
                dispatch(fetchRolesSuccess(res.data));
            })
            .catch((err) => {
                dispatch(fetchRolesFailure(err.message));
            })
    }
}