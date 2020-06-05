import { messageConstants } from '../constants';
import { IDeleteMessagesState, IMessagesAction } from '../types';

export function deleteEmail(state: IDeleteMessagesState = {}, action: IMessagesAction): IDeleteMessagesState {
    switch (action.type) {
        case messageConstants.DELETE_EMAIL_REQUEST:
            return { deleting: true };
        case messageConstants.DELETE_EMAIL_SUCCESS:
            return { success: true };
        case messageConstants.DELETE_EMAIL_FAILURE:
            return {};
        default:
            return state
    }
}