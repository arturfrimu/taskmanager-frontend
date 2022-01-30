import axios from "axios";
import * as types from './HTTPMethodType'

const BASE_API_CALL_URL = "http://localhost:8080/api/v1/";
const BASE_USER_DETAILS_API_CALL_URL = "users/details/id/";

class HTTPService {

    getInfo(path) {
        return request(path, types.GET, {})
    }

    getInfoWithDetails(id) {
        return request(BASE_USER_DETAILS_API_CALL_URL + id, types.GET, {})
    }

    postInfo(path, data) {
        return request(path, types.POST, data)
    }

    putInfo(path, data) {
        return request(path, types.PUT, data)
    }

    deleteInfo(path) {
        return request(path, types.DELETE, {})
    }
}

function request(url, method, requestParams) {
    const config = {
        baseURL: BASE_API_CALL_URL,
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(requestParams),
        method: method
    }

    return axios.request(config);
}

export default new HTTPService();