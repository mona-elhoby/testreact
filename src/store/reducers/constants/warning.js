import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';

//get warning method
export const getWarnMethods = createAsyncThunk('constraint/getWarnMethods', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/warning-method?total=true&WRN_METHOD_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//get warning results
export const getWarnResults = createAsyncThunk('constraint/getWarnResults', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/warning-result?total=true&WRN_RESULT_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//get warning status
export const getWarnStatus = createAsyncThunk('constraint/getWarnStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/warning-status?total=true&WRN_STATUS_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});
//get warning subjects
export const getWarnSubjects = createAsyncThunk('constraint/getWarnSubjects', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/warning-subject?total=true&WRN_SUBJECT_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//set warning method
export const setWarnMethods = createAsyncThunk('constraint/setWarnMethods', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/warning-method?total=true`, data, {
		headers: axiosConfig,
	});

	return { res, data };
});

//get warning results
export const setWarnResults = createAsyncThunk('constraint/setWarnResults', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/warning-result?total=true`, data, {
		headers: axiosConfig,
	});

	return { res, data };
});

//get warning status
export const setWarnStatus = createAsyncThunk('constraint/setWarnStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/warning-status?total=true`, data, {
		headers: axiosConfig,
	});

	return { res, data };
});
//get warning subjects
export const setWarnSubjects = createAsyncThunk('constraint/setWarnSubjects', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/warning-subject?total=true`, data, {
		headers: axiosConfig,
	});

	return { res, data };
});

const warningConstantSlice = createSlice({
	name: 'constant',
	initialState: {
		theWarningResults: [],
		theWarningStatus: [],
		theWarningMethods: [],
		theWarningSubjects: [],
		error: [],
	},
	extraReducers: {
		[getWarnResults.fulfilled]: (state, action) => {
			state.theWarningResults = action.payload;
			state.error = null;
		},

		[getWarnStatus.fulfilled]: (state, action) => {
			state.theWarningStatus = action.payload;
			state.error = null;
		},
		[getWarnSubjects.fulfilled]: (state, action) => {
			state.theWarningSubjects = action.payload;
			state.error = null;
		},
		[getWarnMethods.fulfilled]: (state, action) => {
			state.theWarningMethods = action.payload;
			state.error = null;
		},
	},
});

export default warningConstantSlice.reducer;
