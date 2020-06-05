import { Action } from 'redux';

export interface IAlertAction extends Action {
    type: string
}

export interface IAlertActionMessage extends IAlertAction {
    message?: string
}

export interface IAlertState {
    type?: "error" | "success" | "info" | "warning" | undefined
    message?: string
}