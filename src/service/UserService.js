import SetAuthorizationToken from "./AuthorizationTokenService";
import HTTPService from './HTTPService';


class UserService {

    deleteUser(id) {
        return HTTPService.deleteInfo("delete/id/".concat(id))
    }

    createUser(user) {
        return HTTPService.postInfo("users", user)
    }

    getUserByUsername(username) {
        return HTTPService.getInfo('users/userName/' + username)
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.removeItem('jwtToken');
        SetAuthorizationToken.setAuthorizationToken(null);
    }
}

export default new UserService()