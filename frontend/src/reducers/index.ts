import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { composeEmail } from './composeEmail.reducer';
import { deleteEmail } from './deleteEmail.reducer';
import { emails } from './manageEmails.reducer';

const rootReducer = combineReducers({
    registration,
    authentication,
    composeEmail,
    alert,
    emails,
    deleteEmail
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>