import { configureStore, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer
} from "redux-persist";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('user friends not-existent !!');
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts.reverse();
        },
        setPost: (state, action) => {

            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post

                return post
            })

            state.posts = updatedPosts
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    }
})

export const {
    setMode,
    setFriends,
    setLogin,
    setLogout,
    setPost,
    setPosts,
    setUser
} = authSlice.actions;

const authSliceReducer = authSlice.reducer

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authSliceReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store