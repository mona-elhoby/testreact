import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';


//agent
export const getAgent = createAsyncThunk('constraint/getAgent', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/agency-agent/?total=true&AGE_AGENT_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//agent
export const setAgent = createAsyncThunk('constraint/setAgent', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/agency-agent`, data, {
		headers: axiosConfig,
	});

	return res;
});
//agent attribute
export const getAgentAttr = createAsyncThunk('constraint/getAgentAttr', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/agency-attribute/?total=true&AGE_ATTRBUIT_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//agent attribute
export const setAgentAttr = createAsyncThunk('constraint/setAgentAttr', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/agency-attribute`, data, {
		headers: axiosConfig,
	});

	return res;
});
//getAgentPlace
export const getAgentPlace = createAsyncThunk('constraint/getAgentPlace', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/agency-place/?total=true&AGE_PLACE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//getAgentPlace
export const setAgentPlace = createAsyncThunk('constraint/setAgentPlace', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/agency-place`, data, {
		headers: axiosConfig,
	});

	return res;
});
//getAgentPlace
export const getAgentType = createAsyncThunk('constraint/getAgentType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/agency-type/?total=true&AGE_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//getAgentType
export const setAgentType = createAsyncThunk('constraint/setAgentType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/agency-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

const AgencyConstant = createSlice({
	name: 'constraint',
	initialState: {
		agentsCompo: [],
		agentsAttrsCompo: [],
		agentsPlaceCompo: [],
		agentsTypeCompo: [],
		error: [],
	},
	extraReducers: {
		[getAgent.fulfilled]: (state, action) => {
			state.agentsCompo = action.payload;
			state.error = null;
		},
		[getAgentAttr.fulfilled]: (state, action) => {
			state.agentsAttrsCompo = action.payload;
			state.error = null;
		},
		[getAgentPlace.fulfilled]: (state, action) => {
			state.agentsPlaceCompo = action.payload;
			state.error = null;
		},
		[getAgentType.fulfilled]: (state, action) => {
			state.agentsTypeCompo = action.payload;
			state.error = null;
		},
	},
});

export default AgencyConstant.reducer;
