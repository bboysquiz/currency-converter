import { configureStore, Middleware, AnyAction } from '@reduxjs/toolkit';
import loginReducer, { LoginState } from "./loginSlice";
import thunk, { ThunkMiddleware } from 'redux-thunk'
import historyReducer, { HistoryState } from './historySlice';

export interface RootState {
  login: LoginState;
  history: HistoryState;
}

const middleware: Middleware[] = [thunk as ThunkMiddleware<RootState, AnyAction>];

const store = configureStore({
  reducer: {
    login: loginReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;