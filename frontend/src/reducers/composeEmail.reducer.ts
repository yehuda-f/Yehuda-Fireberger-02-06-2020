import { messageConstants } from '../constants';
import { IComposeState, IMessagesAction } from '../types';

export function composeEmail(state: IComposeState = {}, action: IMessagesAction): IComposeState {
    switch (action.type) {
        case messageConstants.SEND_EMAIL_REQUEST:
            return { sending: true };
        case messageConstants.SEND_EMAIL_SUCCESS:
            return { success: true };
        case messageConstants.SEND_EMAIL_FAILURE:
            return {};
        default:
            return state
    }
}