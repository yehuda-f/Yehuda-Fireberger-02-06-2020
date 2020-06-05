import { Action } from 'redux';

export interface IUserAction extends Action {
    type: string
}

export interface IUserActionMessage extends IUserAction {
    message?: string
}

export interface IUserActionUser extends IUserAction {
    user?: IUserItem,
    loggedIn?: boolean,
}

export interface IUserItem {
    username: string,
    token?: string,
}

export interface IUserState {
    user?: IUserItem,
    loggedIn?: boolean,
    loggingIn?: boolean,
}

export interface IRegisterState {
    registering?: boolean,
}

export interface IRegisterItem {
    username: string,
    password: string,
}