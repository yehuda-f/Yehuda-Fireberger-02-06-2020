import { userConstants } from '../constants';
import { IUserActionUser, IUserState, IUserItem } from '../types';

let storedUser = localStorage.getItem('user');
let user: IUserItem = storedUser ? JSON.parse(storedUser) : null;
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state: IUserState = initialState, action: IUserActionUser): IUserState {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}