import { alertConstants } from '../constants';
import { IAlertActionMessage, IAlertAction } from '../types';

export const alertActions = {
    success,
    error,
    clear
};

function success(message: string): IAlertActionMessage {
    return { type: alertConstants.SUCCESS, message };
}

function error(message: string): IAlertActionMessage {
    return { type: alertConstants.ERROR, message };
}

function clear(): IAlertAction {
    return { type: alertConstants.CLEAR };
}