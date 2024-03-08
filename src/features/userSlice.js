import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('action.payload');
            console.log(action.payload);
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = {}
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;