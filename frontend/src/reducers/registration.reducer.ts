import { userConstants } from '../constants';
import { IUserAction, IRegisterState } from '../types';

export function registration(state: IRegisterState = {}, action: IUserAction): IRegisterState {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}