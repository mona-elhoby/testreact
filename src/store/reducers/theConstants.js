import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';

// get courts name
export const getCourtsName = createAsyncThunk('constraint/courtName', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/court?total=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// set courts name
export const setCourtsName = createAsyncThunk('constraint/setcourtName', async (data, thunkAPI) => {
	const res = await axios.set(`${api_url}/constraint/court`, {
		headers: axiosConfig,
		body: JSON.stringify(data),
	});

	// console.log(res)
	return { res, data };
});
// get appiontmnets type
export const getApionType = createAsyncThunk('constraint/getApionType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/appointment-type?total=true`, {
		headers: axiosConfig,
	});
	// console.log(res)
	return res.data.data;
});

// set appiontmnets type
export const setApionType = createAsyncThunk('constraint/setApionType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/appointment-type`, data, {
		headers: axiosConfig,
	});
	// console.log(res)
	return { res, data };
});
// get agent ant attribute
export const getAgentAttribute = createAsyncThunk('constraint/getAgentAttribute', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/agent-attribute?total=true&AGE_ATTRBUIT_STATUS=true`, {
		headers: axiosConfig,
	});
	// console.log(res)
	return res.data.data;
});

// set agent ant attribute
export const setAgentAttribute = createAsyncThunk('constraint/setAgentAttribute', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/agent-attribute`, data, {
		headers: axiosConfig,
	});
	// console.log(res)
	return { res, data };
});

const constantSlice = createSlice({
	name: 'constant',
	initialState: {
		theCourtsNames: null,
		theAppiontmentType: [],
		theAttributes: [],
		error: [],
	},
	extraReducers: {
		//getCourtsName
		[getCourtsName.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theCourtsNames = action.payload;
			state.error = null;
		},
		// getappionType
		[getApionType.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theAppiontmentType = action.payload;
			state.error = null;
		},
		[getAgentAttribute.fulfilled]: (state, action) => {
			state.theAttributes = action.payload;
			state.error = null;
		}
	},
});

export default constantSlice.reducer;
