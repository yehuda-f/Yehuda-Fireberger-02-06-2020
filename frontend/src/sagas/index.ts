import { all } from 'redux-saga/effects';

import { loginWatcher, registerWatcher } from './user.saga';
import { composeEmailWatcher } from './composeEmail.saga';
import { getAllEmailsWatcher, deleteEmailWatcher } from './manageEmails.saga';

function* rootSaga() {
    yield all(
        [
            loginWatcher(),
            registerWatcher(),
            composeEmailWatcher(),
            getAllEmailsWatcher(),
            deleteEmailWatcher()
        ]);
}

export default rootSaga;