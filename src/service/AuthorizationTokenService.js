import axios from 'axios';

class SetAuthorizationToken {
    setAuthorizationToken(token) {
        if(token) {
            return axios.defaults.headers.common['Authorization'] = token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }
}

export default new SetAuthorizationToken();