import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token } from '../config';

export const loginUser = createAsyncThunk('auth/login', async (userInfo, thunkAPI) => {
	// console.log(userInfo)
		const res = await axios.post(`${api_url}/auth/login`,userInfo, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// console.log('result', res, "userInfo: ", userInfo);
		// store user's token in local storage
		localStorage.setItem('userInfo', JSON.stringify(res.data));
		return { res, userInfo };
});

// refresh token
export const setAccessToken = createAsyncThunk('auth/setAccessToken', async (refToken, thunkAPI) => {
	
		const res = await axios.post(`${api_url}/auth/refresh-token`, refToken,{
			headers: {
				'Content-Type': 'application/json'
			},
		});
		console.log("refToken", refToken, "result: ", res)
		return res.data;
});

export const Logout = createAsyncThunk('auth/Logout', async (_, thunkAPI) => { 
	localStorage.removeItem('userInfo')
}) 

const authSlice = createSlice({
	name: 'auth',
	initialState: { userInfo: {}, isLoading: false, accessToken: null, refreshToken: null },
	extraReducers: {
		[loginUser.fulfilled]: (state, action) => {
			// console.log(state);
			const userToken = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
			// console.log(userToken)
			state.isLoading = false;
			state.refreshToken = userToken?.refreshToken;
			state.accessToken = userToken?.accessToken;
			state.userInfo = action.payload?.userInfo;
		},
		[setAccessToken.fulfilled]: (state, action) => {
			const userToken = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
			// console.log(userToken)
			state.refreshToken = userToken.refreshToken;
			state.accessToken = userToken.accessToken;
		},
		[Logout.fulfilled]: (state, action) => {
			state.refreshToken = null;
			state.accessToken = null;
		}
	},
});

export default authSlice.reducer;
