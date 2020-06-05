import { handleResponse } from '../utils';

export const userService = {
    register,
    login,
    logout
};

function register(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${process.env.REACT_APP_API_URL}/users/register`, requestOptions)
        .then(handleResponse)
}

function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${process.env.REACT_APP_API_URL}/users/authenticate`, requestOptions)
        .then(handleResponse)
}

function logout() {
    localStorage.removeItem('user');
}