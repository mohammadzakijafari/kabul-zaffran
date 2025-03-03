import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
}

const authApi = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(`Action Payload from store ${JSON.stringify(action.payload)}`);

            state.userInfo = action.payload;
            localStorage.setItem('token', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('token');
        },

    },
});


export const { setCredentials, logout } = authApi.actions;
export default authApi.reducer;