import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';
//getWarningsData
export const getWarningsData = createAsyncThunk('warning/getData', async ({ theParams }, thunkAPI) => {
	const params = {};
	if (true) params['total'] = true;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.warNumSearch) params['WRN_NUMBER'] = theParams.warNumSearch;
	if (theParams.warSearchDateFrom) params['WRN_DATE_GTE'] = new Date(theParams.warSearchDateFrom).toLocaleDateString();
	if (theParams.warSearchDateTo) params['WRN_DATE_LTE'] = new Date(theParams.warSearchDateTo).toLocaleDateString();
	if (theParams.searchVal) params['search'] = theParams.searchVal;
	const res = await axios.get(`${api_url}/warning`, {
		params: params,
		headers: axiosConfig,
	});
	// console.log(res);
	return res.data;
});

//getWarningById
export const getWarningById = createAsyncThunk('warning/getWarning', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/warning/${id}`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});


//delete attachment
export const deleteAttachment = createAsyncThunk('warning/deleteAttachedwarning', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/warning/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//add warning
export const addNewWarning = createAsyncThunk('warning/addwarning', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/warning/`, data,{
		headers: axiosConfig,
	});
	return { res, data };
});

//update warning
export const updateWarning = createAsyncThunk('warning/updatewarning', async ({ warId, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/warning/${warId}`, data, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, warId, data };
});

//delete warning
export const deleteWarning = createAsyncThunk('warning/deletewarning', async ({ id, caseId }, thunkAPI) => {
	const result = await axios.delete(`${api_url}/warning/${id}/${caseId}`, {
		headers: axiosConfig,
	});
	return { result, id };
});

//get Attahcment for warning
export const getwarningAttachment = createAsyncThunk('warning/warningAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/warning/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getwarningAttachmentData = createAsyncThunk('warning/warningAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/warning/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//report table design
export const reportTableDesign = createAsyncThunk('warning/reportTableDesign', async(data, thunkAPI) => {
	const {rejectWithValue} = thunkAPI
	try {
		const res = await axios.post(`${api_url}/warning/report`,data, {
			headers: axiosConfig,
		});
		//   console.log(res);
		return { res };
	} catch (error) {
		return rejectWithValue(error.message);
	}
})

const warningSlice = createSlice({
	name: 'warning',
	initialState: {
		allWarnings: [],
		isLoadingWarning: false,
		error: null,
		selectedWarning: null,
	},
	extraReducers: {
		// update state
		[getWarningsData.fulfilled]: (state, action) => {
			state.allWarnings = action.payload;
			state.isLoadingWarning = false;
			state.error = null;
		},

		[getWarningById.fulfilled]: (state, action) => {
			state.selectedWarning = action.payload;
			state.isLoadingWarning = false;
			state.error = null;
		},
		//add warning
		[addNewWarning.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingWarning = false;
			if (action?.payload?.result?.code) {
				return;
			} else {
				state.allWarnings.data.unshift(action.payload.data);
			}
			state.error = null;
		},
		//update warning
		[updateWarning.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingWarning = false;
			const updatedWarningIndex = state.allWarnings.data?.findIndex((ele) => ele.WRN_ID_PK == action.payload.id);
			const allWarningsCopy = [...state.allWarnings.data];
			allWarningsCopy[updatedWarningIndex] = action.payload.data;
			state.allWarnings.data = allWarningsCopy;
			state.error = null;
		},
		//delete warning
		[deleteWarning.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allWarnings = state.allWarnings?.data?.filter((ele) => ele.WRN_ID_PK != action.payload.id);
			state.error = null;
		},
	},
});

export default warningSlice.reducer;
