import {combineReducers} from 'redux';
import user from './reducer/User';
import task from './reducer/Task';
import team from './reducer/Team';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import role from "./reducer/Role";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    blacklist: ['team', 'task']
};


const rootReducer = combineReducers({
    user: user,
    task: task,
    team: team,
    role: role,
});

export default persistReducer(persistConfig, rootReducer);