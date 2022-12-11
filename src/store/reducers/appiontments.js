import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

export const getappiontments = createAsyncThunk('appiontments/getData', async ({ theParams }, thunkAPI) => {
		const params = {};
		if (true) params['total'] = true;
		// if (true) params['limit'] = '10'
		if (theParams?.descSearch) params['APP_DESCRIPTION'] = theParams?.descSearch;
		if (theParams?.nameSearch) params['CLI_NAME'] = theParams?.nameSearch;
		if (theParams?.empSearch) params['EMP_NAME'] = theParams?.empSearch;
		if (theParams?.appTypeSearch) params['APP_TYPE_NAME'] = theParams?.appTypeSearch;
		if (theParams?.appDateToSearch) params['APP_DATE_LTE'] = new Date(theParams?.appDateToSearch).toLocaleDateString();
		if (theParams?.appDateFromSearch) params['APP_DATE_GTE'] = new Date(theParams?.appDateFromSearch).toLocaleDateString();
		if (theParams?.searchVal) params['search'] = theParams?.searchVal;
		const res = await axios.get(`${api_url}/appointment`, {
			params: params,
			headers: axiosConfig,
		});
		// console.log(result)
		return res.data.data;
});

// get appiontment by id
export const getappiontmentById = createAsyncThunk('appiontments/getappiontmentByid', async (id, thunkAPI) => {
		const res = await axios.get(`${api_url}/appointment/${id}`, {
			headers: axiosConfig,
		});
		return res.data;
});

//get Attahcment for appiontment
export const getappiontmentAttachment = createAsyncThunk('appiontment/appiontmentAttachment', async (id, thunkAPI) => {
		const res = await axios.get(`${api_url}/appointment/${id}/attachment`, {
			headers: axiosConfig,
		});
		return res.data;
});

// get file for attachment
export const getappiontmentAttachmentData = createAsyncThunk('appiontment/appiontmentAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
		const result = await axios.get(`${api_url}/appointment/${id}/attachment/${attachedId}`, {
			headers: axiosConfig,
			responseType: 'blob',
		});
		const blob = await result.data;
		getAttachmentData(fileName, blob);
		return result.data;
});

//delete attachment
export const deleteAttachment = createAsyncThunk('appointment/deleteAttachedappointment', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/appointment/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// add new appiontment
export const addNewAppiontment = createAsyncThunk('appiontment/addNewAppiontment', async (data, thunkAPI) => {
		const res = await axios.post(
			`${api_url}/appointment`,
			data,
			{
				headers: axiosConfig,
			},
		);
		// console.log("res", res)
		return { res, data };
});

//  update appiontment
export const UpdateAppiontment = createAsyncThunk('appiontment/UpdateAppiontment', async ({ id, data }, thunkAPI) => {
		const result = await axios.put(
			`${api_url}/appointment/${id}`,
			data,
			{
				headers: axiosConfig,
			},
		);
		console.log(result)
		return { result, data };
});

//delete apptiontment
export const deleteApptiontment = createAsyncThunk('apptiontment/deleteapptiontment', async (id, thunkAPI) => {
		const result = await axios.delete(`${api_url}/appointment/${id}`, {
			headers: axiosConfig,
		});
		  console.log(result);
		return { result, id };
});

const appiontmentsSlice = createSlice({
	name: 'appiontments',
	initialState: {
		allAppiontments: [],
		allAppiontmentsperType: [],
		allAppiontmentsperEmp: [],
		sortAppiontment: [],
		steps: [],
		selectedAppiontment: null,
		isLoadingappiontments: false,
		error: null,
	},
	extraReducers: {
		[getappiontments.pending]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingappiontments = true;
			state.error = null;
		},
		[getappiontments.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingappiontments = false;
			const appiontmentsPerType = action.payload.reduce((acc, curr) => (acc[curr.APP_TYPE_NAME] = acc[curr.APP_TYPE_NAME] || []).push(curr) && acc, {});
			const appiontmentsPerEmp = action.payload.reduce((acc, curr) => (acc[curr.CLI_NAME] = acc[curr.CLI_NAME] || []).push(curr) && acc, {});
			const appiontmentsPerDay = action.payload.reduce((acc, curr) => (acc[curr.APP_DATE] = acc[curr.APP_DATE] || []).push(curr) && acc, {});
			const sortAppiontmentsPerDay = Object.entries(appiontmentsPerDay).sort((a, b) => (a[0] > b[0] ? -1 : 1));
			// console.log(sortAppiontmentsPerDay.map(ele => new Date(ele[0]).toUTCString().slice(4, 11)))
			const theSteps = sortAppiontmentsPerDay.map((ele) => new Date(ele[0]).toUTCString().slice(4, 16));
			state.allAppiontments = action.payload;
			state.sortAppiontment = sortAppiontmentsPerDay;
			state.allAppiontmentsperType = appiontmentsPerType;
			state.allAppiontmentsperEmp = appiontmentsPerEmp;
			state.steps = theSteps;
			state.error = null;
		},
		// get appiontment by id
		[getappiontmentById.fulfilled]: (state, action) => {
			state.isLoadingappiontments = false;
			state.selectedAppiontment = action.payload;
			state.error = null;
		},
		// post appiontment
		[addNewAppiontment.fulfilled]: (state, action) => {
			state.isLoadingappiontments = false;
			state.allAppiontments.push(action.payload);
			state.error = null;
		},
		//update appiontment
		[UpdateAppiontment.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingappiontments = false;
			const updatedAppiontmentIndex = state.allAppiontments.findIndex((ele) => ele.APP_ID_PK == action.payload.id);
			const allAppiontmentsCopy = [...state.allAppiontments];
			allAppiontmentsCopy[updatedAppiontmentIndex] = action.payload.data;
			state.allAppiontments = allAppiontmentsCopy;
			state.error = null;
		},
		//delete Appiotnemnt
		[deleteApptiontment.fulfilled]: (action, state) => {
			// console.log('action.payload', action.payload);
			// state.allAppiontments = state.allAppiontments.filter((ele) => ele.APP_ID_PK != action.payload.id);
			state.isLoadingappiontments = false;
		},
	},
});

export default appiontmentsSlice.reducer;
