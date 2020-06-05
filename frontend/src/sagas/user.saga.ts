import { take, fork, cancel, call, put, cancelled, takeLatest } from 'redux-saga/effects';

import { history } from "../utils";
import { userActions, alertActions } from '../actions';
import { userConstants } from '../constants';
import { userService } from '../services';

function* logout() {
    yield put(userActions.logout())

    localStorage.removeItem('user')
}

function* loginFlow(username: string, password: string) {
    let user
    try {
        user = yield call(userService.login, username, password);

        yield put({ type: userConstants.LOGIN_SUCCESS, user });

        localStorage.setItem('user', JSON.stringify(user));

        history.push('/')
    } catch (error) {
        yield put({ type: userConstants.LOGIN_FAILURE, error });
        yield put(alertActions.error(error));
    } finally {
        if (yield cancelled()) {
            history.push('/login')
        }
    }

    return user
}

export function* loginWatcher() {
    while (true) {
        const { username, password } = yield take(userConstants.LOGIN_REQUEST);

        const task = yield fork(loginFlow, username, password);

        const action = yield take([userConstants.LOGOUT, userConstants.LOGIN_FAILURE]);

        if (action.type === userConstants.LOGOUT) yield cancel(task)

        yield call(logout)
    }
}


function* RegistrationFlow(user: any) {
    try {
        yield call(userService.register, user.username, user.password);

        yield put({ type: userConstants.REGISTER_SUCCESS });

        history.push('/login');

        yield put(alertActions.success('Registration successful'));
    } catch (error) {
        yield put({ type: userConstants.REGISTER_FAILURE, error });
        yield put(alertActions.error(error));
    }
}

export function* registerWatcher() {
    yield takeLatest(userConstants.REGISTER_REQUEST, RegistrationFlow);
}