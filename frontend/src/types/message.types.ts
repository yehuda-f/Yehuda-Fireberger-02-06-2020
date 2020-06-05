import { Action } from 'redux';

export interface IMessagesAction extends Action {
    type: string,
    error?: string,
}

export interface IMessagesActionGetAll extends IMessagesAction {
    allEmails?: IMessagesGetAll,
}

export interface IComposeState {
    sending?: boolean,
    success?: boolean,
}

export interface IMessageItem {
    sender: string,
    receiver: string,
    subject: string,
    message: string,
    creationDate?: string,
}

export interface IMessagesGetAll {
    sent: [IMessageItem],
    received: [IMessageItem],
}

export interface IGetMessagesState {
    searching?: boolean,
    allEmails?: IMessagesGetAll,
    error?: string,
}

export interface IDeleteMessagesState {
    deleting?: boolean,
    success?: boolean,
}