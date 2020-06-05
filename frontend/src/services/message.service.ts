import { authHeader, handleResponse } from '../utils';
import { IMessageItem } from '../types';

export const messageService = {
    send,
    getAll,
    getAllForLoggedInUser,
    deleteEmail
};

function send(email: IMessageItem) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...email })
    };

    return fetch(`${process.env.REACT_APP_API_URL}/messages/write`, requestOptions)
        .then(handleResponse)
}

function getAll(username: string) {
    return fetch(`${process.env.REACT_APP_API_URL}/messages/${username}`)
        .then(handleResponse)
}

function getAllForLoggedInUser(username: string) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    } as RequestInit;

    return fetch(`${process.env.REACT_APP_API_URL}/messages/mine/${username}`, requestOptions)
        .then(handleResponse)
}

function deleteEmail(creationDate: string) {
    const requestOptions = {
        method: 'DELETE',
    } as RequestInit;

    return fetch(`${process.env.REACT_APP_API_URL}/messages/${creationDate}`, requestOptions)
        .then(handleResponse)
}