import { messageConstants } from '../constants';
import { IMessagesActionGetAll, IGetMessagesState } from '../types';

export function emails(state: IGetMessagesState = {}, action: IMessagesActionGetAll): IGetMessagesState {
    switch (action.type) {
        case messageConstants.GET_EMAILS_REQUEST:
            return { searching: true };
        case messageConstants.GET_EMAILS_SUCCESS:
            return { allEmails: action.allEmails };
        case messageConstants.GET_EMAILS_FAILURE:
            return { error: action.error };
        case messageConstants.CLEAR_EMAILS_STATE:
            return {};
        default:
            return state
    }
}