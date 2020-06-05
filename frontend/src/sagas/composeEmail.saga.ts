import { call, put, takeLatest } from 'redux-saga/effects';

import { alertActions } from '../actions';
import { messageConstants } from '../constants';
import { messageService } from '../services';

function* RegistrationFlow(emailAction: any) {
    try {
        yield call(messageService.send, emailAction.email);

        yield put({ type: messageConstants.SEND_EMAIL_SUCCESS });
        yield put(alertActions.success('Send Email successful'));
    } catch (error) {
        yield put({ type: messageConstants.SEND_EMAIL_FAILURE, error });
        yield put(alertActions.error(error));
    }
}

export function* composeEmailWatcher() {
    yield takeLatest(messageConstants.SEND_EMAIL_REQUEST, RegistrationFlow);
}