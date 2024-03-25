import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    friendsValue: 0,
    postsValue: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.user.profile_photo = action.payload.profile_photo ? `https://socialappapi-6239cbdff733.herokuapp.com/storage/${action.payload.profile_photo}` : null
        },
        clearUser: (state) => {
            state.user = {}
        },
        setFriendsValue: (state, action) => {
            state.friendsValue = action.payload
        },
        increaseFriendsValue: (state) => {
            state.friendsValue++
        },
        decreaseFriendsValue: (state) => {
            state.friendsValue--
        },
        setPostsValue: (state, action) => {
            state.postsValue = action.payload
        },
        increasePostsValue: (state) => {
            state.postsValue++
        },
        decreasePostsValue: (state) => {
            state.postsValue--
        },
        changeUserProfilePhoto: (state, action) => {
            state.user = { ...state.user, 'profile_photo': action.payload }
        }
    },
});

export const { setUser, clearUser, setFriendsValue, setPostsValue, increaseFriendsValue, increasePostsValue, decreaseFriendsValue, decreasePostsValue, changeUserProfilePhoto } = userSlice.actions;

export default userSlice.reducer;