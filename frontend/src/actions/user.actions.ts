import { userConstants } from '../constants';

export const userActions = {
    login,
    logout,
    register,
};

function login(username: string, password: string) {
    return { type: userConstants.LOGIN_REQUEST, username, password }
}

function logout() {
    return { type: userConstants.LOGOUT };
}

function register(username: string, password: string) {
    return { type: userConstants.REGISTER_REQUEST, username, password }
}