import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';

export const getSessionsDailyUpdates = createAsyncThunk('dailyUpdate/sessiondailyUpdate', async (date, thunkAPI) => {
		const res = await axios.get(`${api_url}/daily-update/session/?date=${date}`, {
			
			headers: axiosConfig,
		});
		
		// console.log(result)
		return res.data;
	
});

export const getWorkDailyUpdates = createAsyncThunk('dailyUpdate/workdailyUpdate', async (date, thunkAPI) => {
		const res = await axios.get(`${api_url}/daily-update/work/?date=${date}`, {
			
			headers: axiosConfig,
		});
		
		// console.log(res)
		return res.data;
	
});

const dailyUpdateSlice = createSlice({
	name: 'dailyUpdate',
	initialState: {
		allSessions: [],
		allWorks: [],
		isLoadingdailyUpdate: false,
		error: null,
	},
	extraReducers: {
		// get sessions
		[getSessionsDailyUpdates.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingdailyUpdate = false;
			state.allSessions = action.payload;
			state.error = null;
		},
		//get work
		[getWorkDailyUpdates.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingdailyUpdate = false;
			state.allWorks = action.payload;
			state.error = null;
		},
	},
});

export default dailyUpdateSlice.reducer;
