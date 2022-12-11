import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';

//execut constants
export const getExecuteProcedure = createAsyncThunk('constraint/getExecuteProcedure', async (typeId, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/execute-procedure?total=true&EXE_TYPE_ID_PK=${typeId}&EXE_PROCEDURE_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

//execut results
export const getExecuteResult = createAsyncThunk('constraint/getExecuteResult', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/execute-result?total=true&EXE_RESULT_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//execut results
export const getExecuteStatus = createAsyncThunk('constraint/getExecuteStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/execute-status?total=true&EXE_STATUS_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//execut type
export const getExecuteType = createAsyncThunk('constraint/getExecuteType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/execute-type?total=true&EXE_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//execut constants
export const setExecuteProcedure = createAsyncThunk('constraint/setExecuteProcedure', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/execute-procedure`, data, {
		headers: axiosConfig,
	});

	return res;
});

//execut results
export const setExecuteResult = createAsyncThunk('constraint/setExecuteResult', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/execute-result`, data, {
		headers: axiosConfig,
	});

	return res;
});

//execut results
export const setExecuteStatus = createAsyncThunk('constraint/setExecuteStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/execute-status`, data, {
		headers: axiosConfig,
	});
	console.log("res", res)
	return res;
});

//execut type
export const setExecuteType = createAsyncThunk('constraint/setExecuteType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/execute-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

const executeConstants = createSlice({
	name: 'constraint',
	initialState: {
		theExecuteProcedure: [],
		theExecuteStatusCompo: [],
		theExecuteResultsCompo: [],
		theExecuteTypeCompo: [],
		error: [],
	},
	extraReducers: {
		// *************************************** Execute ***************************//
		[getExecuteProcedure.fulfilled]: (state, action) => {
			state.theExecuteProcedure = action.payload;
			state.error = null;
		},
		[getExecuteStatus.fulfilled]: (state, action) => {
			state.theExecuteStatusCompo = action.payload;
			state.error = null;
		},
		[getExecuteResult.fulfilled]: (state, action) => {
			state.theExecuteResultsCompo = action.payload;
			state.error = null;
		},
		[getExecuteType.fulfilled]: (state, action) => {
			state.theExecuteTypeCompo = action.payload;
			state.error = null;
		},
	},
});

export default executeConstants.reducer;
