import { alertConstants } from '../constants';
import { IAlertActionMessage, IAlertState } from '../types';

export function alert(state: IAlertState = {}, action: IAlertActionMessage): IAlertState {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}