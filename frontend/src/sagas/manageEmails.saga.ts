import { call, put, takeLatest, select } from 'redux-saga/effects';

import { alertActions } from '../actions';
import { messageConstants } from '../constants';
import { messageService } from '../services';

function* getAllEmailsFlow(emailAction: any) {
    try {
        const loggedIn = yield select((state) => state.authentication.loggedIn);

        const allEmails = loggedIn ?
            yield call(messageService.getAllForLoggedInUser, emailAction.username) :
            yield call(messageService.getAll, emailAction.username);

        yield put({ type: messageConstants.GET_EMAILS_SUCCESS, allEmails });
        yield put(alertActions.success('Get Emails successful'));
    } catch (error) {
        yield put({ type: messageConstants.GET_EMAILS_FAILURE, error });
        yield put(alertActions.error(error));
    }
}

export function* getAllEmailsWatcher() {
    yield takeLatest(messageConstants.GET_EMAILS_REQUEST, getAllEmailsFlow);
}


function* deleteEmailFlow(emailAction: any) {
    try {
        yield call(messageService.deleteEmail, emailAction.creationDate);

        yield put({ type: messageConstants.DELETE_EMAIL_SUCCESS });
        yield put(alertActions.success('Delete Email successful'));
    } catch (error) {
        yield put({ type: messageConstants.DELETE_EMAIL_FAILURE, error });
        yield put(alertActions.error(error));
    }
}

export function* deleteEmailWatcher() {
    yield takeLatest(messageConstants.DELETE_EMAIL_REQUEST, deleteEmailFlow);
}