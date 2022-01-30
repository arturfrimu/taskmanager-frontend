import AuthorizationTokenService from "./AuthorizationTokenService";
import HTTPService from "./HTTPService";

const USER_LOGIN_API_BASE_URL = "auth/login";
const USER_REGISTRATION_API_BASE_URL = "users";

class AuthService {

    loginUser(user) {
        console.log(USER_LOGIN_API_BASE_URL, user)
        return HTTPService.postInfo(USER_LOGIN_API_BASE_URL, user)
    }

    logout() {
        localStorage.removeItem('jwtToken');
        AuthorizationTokenService.setAuthorizationToken(null);
    }

    register(user) {
        return HTTPService.postInfo(USER_REGISTRATION_API_BASE_URL, user).then((res) => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            AuthorizationTokenService.setAuthorizationToken(token);
        }).catch((error) => {
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();