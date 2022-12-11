import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';

export const getSchedule = createAsyncThunk('schedule/chedule', async ({ month, year, lang, emp }, thunkAPI) => {
	const res = await axios.get(`${api_url}/schedule?month=${month}&year=${year}&lang=${lang}&emp=${emp}`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

//get latest appiontment
export const getLatestSchedule = createAsyncThunk('schedule/chedule', async (_, thunkAPI) => {
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();
	const res = await axios.get(`${api_url}/schedule?month=${month}&year=${year}&lang=${0}&emp=${1}`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});
const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: {
		schedules: [],
		Latestchedules: [],
		isLoadingschedule: false,
		error: null,
	},
	extraReducers: {
		[getSchedule.fulfilled]: (state, action) => {
			console.log("action.payload", action.payload);
			state.isLoadingschedule = false;
			state.schedules = action.payload.data;
			state.error = null;
		},
		[getLatestSchedule.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingschedule = false;
			state.Latestchedules = action.payload.data?.sort((a, b) => (a?.StartDate > b?.StartDate ? -1 : 1));
			state.error = null;
		},
	},
});

export default scheduleSlice.reducer;
