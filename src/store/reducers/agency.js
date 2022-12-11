import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url , axiosConfig } from '../config';
import { getAttachmentData } from './utils';

export const getAgencyData = createAsyncThunk('agency/allAgency', async ({ theParams }, thunkAPI) => {
	// console.log("theParams", theParams)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	// console.log(token )
	try {
		const params = {};
		if (true) params['total'] = true;
		if (true) params['limit'] = '10';
		if (theParams?.offset) params['offset'] = theParams?.offset;
		if (theParams?.barCodeSearch) params['AGE_CODE'] = theParams?.barCodeSearch;
		if (theParams?.ageNumSearch) params['AGE_NUMBER'] = theParams?.ageNumSearch;
		if (theParams?.ageType) params['AGE_TYPE_NAME'] = theParams?.ageType;
		if (theParams?.agePlace) params['AGE_PLACE_NAME'] = theParams?.agePlace;
		if (theParams?.ageStartDateTo) params['AGE_START_DATE_LTE'] = new Date(theParams?.ageStartDateTo)?.toLocaleDateString();
		if (theParams?.ageStartDateFrom) params['AGE_START_DATE_GTE'] = new Date(theParams?.ageStartDateFrom)?.toLocaleDateString();
		if (theParams?.ageEndDateTo) params['AGE_START_DATE_LTE'] = new Date(theParams?.ageEndDateTo)?.toLocaleDateString();
		if (theParams?.ageEndDateFrom) params['AGE_END_DATE_GTE'] = new Date(theParams?.ageEndDateFrom)?.toLocaleDateString();
		if (theParams?.theAttr) params['AGE_ATTRBUIT_NAME'] = theParams?.theAttr;
		if (theParams?.agents) params['AGENTS'] = theParams?.agents;
		if (theParams?.notesSearch) params['AGE_NOTES'] = theParams?.notesSearch;
		if (theParams?.searchVal) params['search'] = theParams?.searchVal;
		if (theParams?.selctedVal == 'agencyWithOpenFiles') params['END_OPEN_FILE'] = true;
		if (theParams?.selctedVal == 'agencyWithClosedFiles') params['END_CLOSE_FILE'] = true;
		if (theParams?.selctedVal == 'agencyUnAttached') params['_FILE'] = 0;
		const res = await axios.get(`${api_url}/agency/`, { params: params, headers: axiosConfig });
		// console.log("res", res.data);
		return res.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// get agency by id
export const getAgencyById = createAsyncThunk('agency/agencyById', async (id, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		// console.log(id)
		const res = await axios.get(`${api_url}/agency/${id}`, { headers: axiosConfig });
		// console.log(res)
		return res.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//get Attahcment for agency
export const getAgencyAttachment = createAsyncThunk('agency/agencyAttachment', async (id, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.get(`${api_url}/agency/${id}/attachment`, { headers: axiosConfig });
		// console.log(result)
		return res.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// get file for attachment
export const getAgencyAttachmentData = createAsyncThunk('agency/agencyAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const result = await axios.get(`${api_url}/agency/${id}/attachment/${attachedId}`, { headers: axiosConfig, responseType: 'blob' });
		const blob = await result.data;
		getAttachmentData(fileName, blob);
		console.log(fileName);
		return result.data.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//delete attachment
export const deleteAttachment = createAsyncThunk('agency/addNewagency', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/agency/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// get agecies end in month
export const getAgencyEndInMonth = createAsyncThunk('agency/agencyEndInMonth', async (date, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.get(`${api_url}/agency/?AGE_END_DATE_GTE=${new Date().toLocaleDateString()}&AGE_END_DATE_LTE=${date}`, {
			headers: axiosConfig,
		});
		//   console.log(result.data)
		return res.data.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// get agecies with open file
export const getAgencyWithOpenFile = createAsyncThunk('agency/agencyOpenFile', async (_, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.get(`${api_url}/agency/?END_OPEN_FILE=true`, { headers: axiosConfig });

		return res.data?.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// get agecies with closed file
export const getAgencyWithClosedFile = createAsyncThunk('agency/agencyClosedFile', async (_, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.get(`${api_url}/agency/?END_CLOSE_FILE=true`, { headers: axiosConfig });

		return res.data?.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// get agecies with closed file
export const getAgencyUnAttached = createAsyncThunk('agency/agencyUnAttached', async (_, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.get(`${api_url}/agency/?_FILE=0`, { headers: axiosConfig });

		return res.data?.data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// add new agency
export const addNewAgency = createAsyncThunk('agency/addNewagency', async (data, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.post(`${api_url}/agency`, data, { headers: axiosConfig });
		//   console.log(result);
		return { res, data };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//update Agency
export const UpdateAgency = createAsyncThunk('agency/UpdateAgency', async ({ id, data }, thunkAPI) => {
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const result = await axios.put(`${api_url}/agency/${id}`, data, { headers: axiosConfig });
		return { result, data };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});
//delete Agency
export const deleteAgency = createAsyncThunk('agency/deleteAgency', async (id, thunkAPI) => {
	const result = await axios.delete(`${api_url}/agency/${id}`, {
		headers: axiosConfig,
	});
	// console.log(id)
	return { result, id };
});

const agencySlice = createSlice({
	name: 'agency',
	initialState: {
		allAgency: [],
		isLoadingAgency: false,
		error: null,
		agencyById: null,
		agencyEndInMonth: null,
		agencyWithOpenFiles: null,
		agencyWithClosedFiles: null,
		agencyUnAttached: null,
	},
	extraReducers: {
		[getAgencyData.fulfilled]: (state, action) => {
			//   console.log("action.payload", action.payload);
			state.isLoadingAgency = false;
			state.allAgency = action.payload;
			state.error = null;
		},

		// get case by id
		[getAgencyById.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingAgency = false;
			state.agencyById = action.payload;
			state.error = null;
		},
		// agency end in month
		[getAgencyEndInMonth.fulfilled]: (state, action) => {
			//   console.log("action.payload", action.payload)
			state.isLoadingAgency = false;
			state.agencyEndInMonth = action.payload;
			state.error = null;
		},

		// getAgencyWithOpenFile
		[getAgencyWithOpenFile.fulfilled]: (state, action) => {
			//   console.log(action.payload)
			state.isLoadingAgency = false;
			state.agencyWithOpenFiles = action.payload;
			state.error = null;
		},

		//getAgencyWithClosedFile
		[getAgencyWithClosedFile.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingAgency = false;
			state.agencyWithClosedFiles = action.payload;
			state.error = null;
		},

		//getAgencyUnAttached
		[getAgencyUnAttached.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingAgency = false;
			state.agencyUnAttached = action.payload;
			state.error = null;
		},
		// post appiontment
		[addNewAgency.fulfilled]: (state, action) => {
			state.isLoadingAgency = false;
			state.allAgency?.data.unshift(action.payload);
			state.error = null;
		},
		[deleteAgency.fulfilled]: (action, state) => {
			// console.log('action.payload', action.payload);
			state.allAgency = { date: state.allAgency?.data.filter((ele) => ele.AGE_ID_PK != action.payload.id), total: state.allAgency?.total };
			state.isLoadingAgency = false;
		},
	},
});

export default agencySlice.reducer;
