import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

//getExecuteData
export const getExecuteData = createAsyncThunk('execute/getData', async ({ theParams }, thunkAPI) => {
	// console.log("theParams", theParams)

	const params = {};
	if (true) params['total'] = true;
	if (theParams.limit) params['limit'] = theParams.limit;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.typeExecuteSearch) params['EXE_TYPE_NAME'] = theParams.typeExecuteSearch;
	if (theParams.exeSearchDateFrom) params['EXE_DATE_GTE'] = new Date(theParams.exeSearchDateFrom).toLocaleDateString();
	if (theParams.exeSearchDateTo) params['EXE_DATE_LTE'] = new Date(theParams.exeSearchDateTo).toLocaleDateString();
	if (theParams.searchVal) params['search'] = theParams.searchVal;
	const res = await axios.get(`${api_url}/execute/`, {
		params: params,
		headers: axiosConfig,
	});

	// console.log(result.data);
	return res.data;
});

// getExecuteById
export const getExecuteById = createAsyncThunk('execute/getExecute', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/execute/${id}`, {
		method: 'GET',
		// params: {total: true, STG_ID_PK: id},
		headers: axiosConfig,
	});

	//   console.log(result)
	return res.data;
});

// add new execute
export const addNewExecute = createAsyncThunk('execute/addExecute', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/execute`, data, {
		headers: axiosConfig,
	});

	//   console.log(result);
	return { res, data };
});

// update execute
export const updateExecute = createAsyncThunk('execute/updateExecute', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/execute/${id}`, data, {
		headers: axiosConfig,
	});
	return { res, id, data };
});

// delete execute
export const deleteExecute = createAsyncThunk('execute/deleteExecute', async ({ id, caseId }, thunkAPI) => {
	const res = await axios.delete(`${api_url}/execute/${id}/${caseId}`, {
		headers: axiosConfig,
	});
	//   console.log("res", res);
	return { res, id };
});

//get Attahcment for execute
export const getexecuteAttachment = createAsyncThunk('execute/executeAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/execute/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getexecuteAttachmentData = createAsyncThunk('execute/executeAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/execute/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});



//delete attachment
export const deleteAttachment = createAsyncThunk('execute/deleteAttachedexecute', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/execute/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//report table design
export const reportTableDesign = createAsyncThunk('execute/reportTableDesign', async(data, thunkAPI) => {
	const {rejectWithValue} = thunkAPI
	try {
		const res = await axios.post(`${api_url}/execute/report`,data, {
			headers: axiosConfig,
		});
		//   console.log(res);
		return { res };
	} catch (error) {
		return rejectWithValue(error.message);
	}
})

const executeSlice = createSlice({
	name: 'stage',
	initialState: {
		allExecute: [],
		allTheExcutes: [],
		isLoading: false,
		error: null,
		selectedExecute: null,
	},
	extraReducers: {
		[getExecuteData.fulfilled]: (state, action) => {
			state.allExecute = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		[getExecuteById.fulfilled]: (state, action) => {
			state.selectedExecute = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		[addNewExecute.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			if (action?.payload?.result?.code) {
				return;
			} else {
				state.allExecute.data.unshift(action.payload.data);
			}
			state.error = null;
		},
		[updateExecute.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload.id);
			state.isLoadingSession = false;
			const updatedExecuteIndex = state.allExecute?.data?.findIndex((ele) => ele.EXE_ID_PK == action.payload.id);
			const allExecuteCopy = [...state.allExecute.data];
			allExecuteCopy[updatedExecuteIndex] = action.payload.data;
			state.allExecute.data = allExecuteCopy;
			state.error = null;
		},
		[deleteExecute.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allExecute.data = state.allExecute.data.filter((ele) => ele.EXE_ID_PK != action.payload.id);
			state.error = null;
		},
	},
});

export default executeSlice.reducer;
