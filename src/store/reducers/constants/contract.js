import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';


//duration
export const getcontractDuration = createAsyncThunk('constraint/getcontractDuration', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/contract-duration?total=true&COR_DURATION_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//duration
export const setcontractDuration = createAsyncThunk('constraint/setcontractDuration', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/contract-duration`, data, {
		headers: axiosConfig,
	});

	return res;
});
//contract item
export const getcontractItem = createAsyncThunk('constraint/getcontractItem', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/contract-item?total=true&COR_ITEM_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//contract item
export const setcontractItem = createAsyncThunk('constraint/setcontractItem', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/contract-item`, data, {
		headers: axiosConfig,
	});

	return res;
});
//getcontractStatus
export const getcontractStatus = createAsyncThunk('constraint/getcontractStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/contract-status?total=true&COR_STATUS_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//getcontractStatus
export const setcontractStatus = createAsyncThunk('constraint/setcontractStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/contract-status`, data, {
		headers: axiosConfig,
	});

	return res;
});
//contract type
export const getcontractType = createAsyncThunk('constraint/getcontractType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/contract-type?total=true&COR_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//contract type
export const setcontractType = createAsyncThunk('constraint/setcontractType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/contract-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

const ContractConstant = createSlice({
	name: 'constraint',
	initialState: {
		contractDurationCompo: [],
		contractItemCompo: [],
		contractStatusCompo: [],
		contractTypeCompo: [],
		error: [],
	},
	extraReducers: {
		[getcontractDuration.fulfilled]: (state, action) => {
			state.contractDurationCompo = action.payload;
			state.error = null;
		},
		[getcontractItem.fulfilled]: (state, action) => {
			state.contractItemCompo = action.payload;
			state.error = null;
		},
		[getcontractStatus.fulfilled]: (state, action) => {
			state.contractStatusCompo = action.payload;
			state.error = null;
		},
		[getcontractType.fulfilled]: (state, action) => {
			state.contractTypeCompo = action.payload;
			state.error = null;
		},
	},
});

export default ContractConstant.reducer;
