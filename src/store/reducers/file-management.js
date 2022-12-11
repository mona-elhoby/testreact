import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';
import {getAttachmentData} from "./utils"

export const getCases = createAsyncThunk('fileManagement/getCases', async ({ theParams }, thunkAPI) => {
	// console.log("theParams", theParams)

	const params = {};
	if (true) params['total'] = true;
	if (true) params['limit'] = '10';
	if (theParams?.offset) params['offset'] = theParams?.offset;
	if (theParams?.casNumberSearch) params['CAS_NUMBER'] = theParams?.casNumberSearch;
	if (theParams?.antsSearch) params['ANTS'] = theParams?.antsSearch;
	if (theParams?.agentSearch) params['AGENTS'] = theParams?.agentSearch;
	if (theParams?.fileTypeSearch) params['FIL_TYPE_NAME'] = theParams?.fileTypeSearch;
	if (theParams?.caseOpenFromSearch) params['CAS_OPEN_DATE_GTE'] = theParams?.caseOpenFromSearch.toLocaleString();
	if (theParams?.caseOpenToSearch) params['CAS_OPEN_DATE_LTE'] = theParams?.caseOpenToSearch.toLocaleString();
	if (theParams?.subCasSearch) params['CAS_SUBJECT'] = theParams?.subCasSearch;
	if (theParams?.categorySearch) params['FIL_CATEGORY_NAME'] = theParams?.categorySearch;
	if (theParams?.searchVal) params['search'] = theParams?.searchVal;
	const res = await axios.get(`${api_url}/case/?${new URLSearchParams(params)}`, {
		headers: axiosConfig,
	});
	//   console.log(res);
	return res.data;
});

// get caseByID
export const getCaseById = createAsyncThunk('fileManagement/case', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/case/${id}`, {
		headers: axiosConfig,
	});
	//   console.log(res)
	return res.data;
});

//get Attahcment for case
export const getcaseAttachment = createAsyncThunk('case/caseAttachment', async (id, thunkAPI) => {
	// console.log(id)
	const res = await axios.get(`${api_url}/case/${id}/attachment`, {
		headers: axiosConfig,
	});
	// console.log(result)
	return res.data;
});

// get file for attachment
export const getcaseAttachmentData = createAsyncThunk('case/caseAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/case/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//delete Attachment
export const deleteAttachment = createAsyncThunk('case/deleteAttachedcase', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/case/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//export const add new file
export const addNewFile = createAsyncThunk('case/addNewFile', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/case`, data, {
		headers: axiosConfig,
	});
	return res.data;
});

//update case
export const updateFile = createAsyncThunk('case/updateFile', async ({data, id}, thunkAPI) => {
	const res = await axios.put(`${api_url}/case/${id}`, data, {
		headers: axiosConfig,
	});
	return { id, data, res };
});

//delete case
export const deleteFile = createAsyncThunk('case/deleteFile', async (id, thunkAPI) => {
	const res = await axios.delete(`${api_url}/case/${id}`, {
		headers: axiosConfig,
	});
	return { id, res };
});

//report table design
export const reportTableDesign = createAsyncThunk('case/reportTableDesign', async(data, thunkAPI) => {
	const {rejectWithValue} = thunkAPI
	try {
		const res = await axios.post(`${api_url}/case/report`,data, {
			headers: axiosConfig,
		});
		//   console.log(res);
		return { res };
	} catch (error) {
		return rejectWithValue(error.message);
	}
})

export const fileManagementSlice = createSlice({
	name: 'fileManagement',
	initialState: { allCases: [], isLoadingFileManagment: false, error: null, caesById: null, selectedCase: null },
	extraReducers: {
		[getCases.fulfilled]: (state, action) => {
			state.isLoadingFileManagment = false;
			state.allCases = action.payload;
			state.error = null;
		},

		//get case by id
		[getCaseById.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingFileManagment = false;
			state.selectedCase = action.payload;
			state.error = null;
		},
		[addNewFile.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoading = false;
			state.allCases.data?.push(action.payload);
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[updateFile.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			// const updatedCaseIndex = state.allCases?.data?.findIndex((ele) => ele.CAS_ID_PK == action.payload.id);
			// const allCaseCopy = state.allCases?.data;
			// allCaseCopy[updatedCaseIndex] = action.payload.data;
			// state.allCases = {data: allCaseCopy, total: state.allCases.total};
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[deleteFile.fulfilled]: (state, action) => {
			console.log('action.payload', action.payload);
			state.isLoading = false;
			state.allCases = {data: state.allCases.data?.filter(ele => ele.CAS_ID_PK != action.payload.id), total: state.allCases.total - 1};
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
	},
});

export default fileManagementSlice.reducer;
