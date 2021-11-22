import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { listReducer } from './List/listReducer';
import { alertReducer } from './Alert/alertReducer';
import { modalOpenReducer } from './Modal/modalOpenReducer';
import { authReducer } from './Auth/authReducer';

const rootReducer = combineReducers({
    list: listReducer,
    alert: alertReducer,
    modal: modalOpenReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());