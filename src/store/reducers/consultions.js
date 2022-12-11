import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';
//getConsultionsData
export const getConsultionsData = createAsyncThunk('Consultions/getData', async ({ theParams }, thunkAPI) => {
	const params = {};
	if (true) params['total'] = true;
	if (theParams.limit) params['limit'] = theParams.limit;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.warNumSearch) params['WRN_NUMBER'] = theParams.warNumSearch;
	if (theParams.warSearchDateFrom) params['WRN_DATE_GTE'] = new Date(theParams.warSearchDateFrom).toLocaleDateString();
	if (theParams.warSearchDateTo) params['WRN_DATE_LTE'] = new Date(theParams.warSearchDateTo).toLocaleDateString();
	if (theParams.searchVal) params['search'] = theParams.searchVal;
	// console.log(params)
	const res = await axios.get(`${api_url}/consultation`, {
		params: params,
		headers: axiosConfig,
	});
	// console.log(res);
	return res.data;
});

//getConsultionsById
export const getConsultionsById = createAsyncThunk('Consultions/getConsultions', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/consultation/${id}`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

//add Consultions
export const addNewConsultions = createAsyncThunk('consultation/addConsultions', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/consultation/`, data,{
		headers: axiosConfig,
	});
	return { res, data };
});

//update Consultions
export const updateConsultions = createAsyncThunk('Consultions/updateConsultions', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/consultation/${id}`, data, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, id, data };
});

//delete Consultions
export const deleteConsultions = createAsyncThunk('Consultions/deleteConsultions', async (id, thunkAPI) => {
	const result = await axios.delete(`${api_url}/consultation/${id}`, {
		headers: axiosConfig,
	});
	return { result, id };
});

//get Attahcment for Consultions
export const getConsultionsAttachment = createAsyncThunk('Consultions/ConsultionsAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/consultation/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getConsultionsAttachmentData = createAsyncThunk('Consultions/ConsultionsAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/consultation/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//delete attachment
export const deleteAttachment = createAsyncThunk('consultation/deleteAttachedconsultation', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/consultation/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const Consultionslice = createSlice({
	name: 'Consultions',
	initialState: {
		allConsultions: [],
		isLoadingConsultions: false,
		error: null,
		selectedConsultions: null,
	},
	extraReducers: {
		// update state
		[getConsultionsData.fulfilled]: (state, action) => {
			// console.log("action: ", action.payload)
			state.allConsultions = action.payload;
			state.isLoadingConsultions = false;
			state.error = null;
		},

		[getConsultionsById.fulfilled]: (state, action) => {
			state.selectedConsultions = action.payload;
			state.isLoadingConsultions = false;
			state.error = null;
		},
		//add Consultions
		[addNewConsultions.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingConsultions = false;
			if (action?.payload?.result?.code) {
				return;
			} else {
				state.allConsultions.data.unshift(action.payload.data);
			}
			state.error = null;
		},
		//update Consultions
		[updateConsultions.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingConsultions = false;
			const updatedConsultionsIndex = state.allConsultions.data?.findIndex((ele) => ele.CON_ID_PK == action.payload.id);
			const allConsultionsCopy = [...state.allConsultions.data];
			allConsultionsCopy[updatedConsultionsIndex] = action.payload.data;
			state.allConsultions.data = allConsultionsCopy;
			state.error = null;
		},
		//delete Consultions
		[deleteConsultions.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allConsultions = {total:state.allConsultions.total, data: state.allConsultions?.data?.filter((ele) => ele.CON_ID_PK != action.payload.id)};
			state.error = null;
		},
	},
});

export default Consultionslice.reducer;
