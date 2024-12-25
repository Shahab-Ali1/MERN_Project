import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    LoggedInUser: {}
};

const authSlice = createSlice({
    initialState: { ...INITIAL_STATE },
    name: "Auth",
    reducers: {
        getUserInfo: (state, action) => {
            const data = action.payload;
            state.LoggedInUser = data;
        },
    }
});

export const {
    getUserInfo,
} = authSlice.actions;

export default authSlice.reducer;