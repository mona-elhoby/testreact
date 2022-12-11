import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

//getInformingsData
export const getInformingsData = createAsyncThunk('informing/getData', async ({ theParams }, thunkAPI) => {
	const params = {};
	if (true) params['total'] = true;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.limit) params['limit'] = theParams.limit;
	if (theParams.infNumSearch) params['INR_NUMBER'] = theParams.infNumSearch;
	if (theParams.infSearchDateFrom) params['INR_DATE_GTE'] = new Date(theParams.infSearchDateFrom).toLocaleDateString();
	if (theParams.infSearchDateTo) params['INR_DATE_LTE'] = new Date(theParams.infSearchDateTo).toLocaleDateString();
	if (theParams.searchVal) params['search'] = theParams?.searchVal;
	// console.log(theParams);
	const res = await axios.get(`${api_url}/informing/`, {
		params: params,
		headers: axiosConfig,
	});
	return res.data;
});

//getInformingById
export const getInformingById = createAsyncThunk('informing/getInforming', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/informing/${id}`, {
		headers: axiosConfig,
	});
	return res.data;
});

//add informing
export const addNewInforming = createAsyncThunk('informing/addinforming', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/informing`, data, {
		headers: axiosConfig,
	});
	return { res, data };
});

//update informing
export const updateInforming = createAsyncThunk('informing/updateinforming', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/informing/${id}`, data, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, id, data };
});

//delete informing
export const deleteInforming = createAsyncThunk('informing/deleteinforming', async ({ id, caseId }, thunkAPI) => {
	const result = await axios.delete(`${api_url}/informing/${id}/${caseId}`, {
		headers: axiosConfig,
	});
	return { result, id };
});

//get Attahcment for informing
export const getinformingAttachment = createAsyncThunk('informing/informingAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/informing/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(res)
	return res.data;
});

// get file for attachment
export const getinformingAttachmentData = createAsyncThunk('informing/informingAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/informing/${id}/attachment/${attachedId}`, {
		headers: {
			'Content-Type': 'application/octet-stream',
			// 'Content-Disposition': `attachment; filename=${fileName}`,
			Authorization: token,
		},
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//delete attachment
export const deleteAttachment = createAsyncThunk('informing/deleteAttachedinforming', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/informing/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//report table design
// export const reportTableDesign = createAsyncThunk('informing/reportTableDesign', async(data, thunkAPI) => {
// 	const {rejectWithValue} = thunkAPI
// 	try {
// 		const res = await axios.post(`${api_url}/informing/${id}/report`,data, {
// 			headers: axiosConfig,
// 		});
// 		return { res };
// 	} catch (error) {
// 		return rejectWithValue(error.message);
// 	}
// })

const informingSlice = createSlice({
	name: 'informing',
	initialState: {
		allInformings: [],
		allTheInformings: [],
		isLoadingInforming: false,
		error: null,
		selectedInforming: null,
	},
	extraReducers: {
		[getInformingsData.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allInformings = action.payload;
			state.isLoadingInforming = false;
			state.error = null;
		},
		//getInformingById
		[getInformingById.fulfilled]: (state, action) => {
			state.selectedInforming = action.payload;
			state.isLoadingInforming = false;
			state.error = null;
		},
		//add warning
		[addNewInforming.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingInforming = false;
			if (action?.payload?.result?.code) {
				return;
			} else {
				state.allInformings.data?.unshift(action.payload.data);
			}
			state.error = null;
		},
		//update warning
		[updateInforming.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingInforming = false;
			const updatedIndex = state.allInformings.data.findIndex((ele) => ele.WRN_ID_PK == action.payload.id);
			const allInformingsCopy = [...state.allInformings.data];
			allInformingsCopy[updatedIndex] = action.payload.data;
			state.allInformings.data = allInformingsCopy;
			state.error = null;
		},
		//delete warning
		[deleteInforming.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allInformings.data = state.allInformings.data.filter((ele) => ele.INR_ID_PK != action.payload.id);
			state.error = null;
		},
	},
});

export default informingSlice.reducer;
