import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
    login: boolean;
    userId: number;
}
let loginValue = false
let userId = -1;
if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('isLogin') === 'true') {
        loginValue = true;
        userId = Number(localStorage.getItem('userId'));
    } else {
        loginValue = false;
        userId = -1;
    }
} else {
    loginValue = false;
    userId = -1;
}
const initialState: LoginState = {
    login: loginValue,
    userId: userId,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin(state) {
            state.login = true
        },
        setLogout(state) {
            state.login = false
        },
        setUserId(state, action) {
            state.userId = action.payload
        }
    },
})

export const { setLogin, setLogout, setUserId } = loginSlice.actions


export default loginSlice.reducer