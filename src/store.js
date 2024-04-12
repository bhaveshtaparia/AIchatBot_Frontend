import { applyMiddleware, combineReducers, createStore} from 'redux'
import {thunk }from 'redux-thunk'
import authReducer from './reducer/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
const rootReducer=combineReducers({
auth:authReducer,
})
// const middleware=[thunk]
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;