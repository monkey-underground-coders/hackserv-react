import {combineReducers} from 'redux';
import isLogged from './isLogged';
import users from './users';

const allReducers = combineReducers({
    isLogged,
    users
});

export default allReducers;