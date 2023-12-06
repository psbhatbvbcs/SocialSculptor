// appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  mode: localStorage.getItem("mode") || "light",
  server: process.env.REACT_APP_BACKEND_URL,
  posts: [],
  reddit: [],
  youtube: [],
  seniorsData: [],
  insights: [],
  clubsData: [],
  onlineUsers: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setServer: (state, action) => {
      state.server = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setReddit: (state, action) => {
      state.reddit = action.payload;
    },
    setYoutube: (state, action) => {
      state.youtube = action.payload;
    },
    setSeniorsData: (state, action) => {
      state.seniorsData = action.payload;
    },
    setInsights: (state, action) => {
      state.insights = action.payload;
    },
    setClubsData: (state, action) => {
      state.clubsData = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setLoading,
  setUser,
  setMode,
  setServer,
  setPosts,
  setReddit,
  setYoutube,
  setSeniorsData,
  setInsights,
  setClubsData,
  setOnlineUsers,
} = appSlice.actions;

export default appSlice.reducer;
