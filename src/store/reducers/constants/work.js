import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';

//getWorkKind
export const getWorkKind = createAsyncThunk('constraint/WorkKind', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/work-kind`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//getWorkReasons
export const getWorkReasons = createAsyncThunk('constraint/WorkReasons', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/work-type?total=true&WRK_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//getWorkReasons
export const getWorkStatusReasons = createAsyncThunk('constraint/WorkStatusReasons', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/work-reason?total=true&WRK_REASON_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//setWorkKind
export const setWorkKind = createAsyncThunk('constraint/setWorkKind', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/work-kind`, data,{
		headers: axiosConfig,
	});

	return { res, data };
});

//setWorkReasons
export const setWorkReasons = createAsyncThunk('constraint/setWorkReasons', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/work-type`, data,{
		headers: axiosConfig,
	});

	return { res, data };
});

//getWorkReasons
export const setWorkStatusReasons = createAsyncThunk('constraint/setWorkStatusReasons', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/work-reason`, data,{
		headers: axiosConfig,
	});

	return { res, data };
});

const constantWorkSlice = createSlice({
	name: 'constant',
	initialState: {
		theWorkStatusReasons: null,
		theWorksKind: null,
		theWorkReasons: null,
		error: [],
	},
	extraReducers: {
		//getWorkKind
		[getWorkKind.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theWorksKind = action.payload;
			state.error = null;
		},

		// getWorkReasons
		[getWorkReasons.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theWorkReasons = action.payload;
			state.error = null;
		},

		// getappionType
		[getWorkStatusReasons.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theWorkStatusReasons = action.payload;
			state.error = null;
		},
	},
});

export default constantWorkSlice.reducer;
