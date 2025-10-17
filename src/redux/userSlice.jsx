import { createSlice } from "@reduxjs/toolkit";

const persistedUser = JSON.parse(localStorage.getItem('users')) || null;

const initialState = {
    currentUser: persistedUser
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser(state, action) {
            const user = action.payload; // {name, email, role}
            state.currentUser = user;
            localStorage.setItem('users', JSON.stringify(user));
        },
        loginUser(state, action) {
            const user = action.payload; // {name, email, role}
            state.currentUser = user;
            localStorage.setItem('users', JSON.stringify(user));
        },
        logoutUser(state) {
            state.currentUser = null;
            localStorage.removeItem('users');
        }
    }
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;


