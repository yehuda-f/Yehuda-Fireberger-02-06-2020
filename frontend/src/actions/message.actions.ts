import { messageConstants } from '../constants';
import { IMessageItem } from '../types';

export const messageActions = {
    send,
    getAllEmails,
    clearAllEmailsState,
    deleteEmail
};

function send(email: IMessageItem) {
    return { type: messageConstants.SEND_EMAIL_REQUEST, email }
}

function getAllEmails(username: string) {
    return { type: messageConstants.GET_EMAILS_REQUEST, username }
}

function clearAllEmailsState() {
    return { type: messageConstants.CLEAR_EMAILS_STATE };
}

function deleteEmail(creationDate: Number) {
    return { type: messageConstants.DELETE_EMAIL_REQUEST, creationDate }
}