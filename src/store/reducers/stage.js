import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

// get all stages
export const getAllStages = createAsyncThunk('stage/allStages', async ({ theparams }, thunkAPI) => {
	const params = {};
	if (true) params['total'] = true;
	if (theparams?.limit) params['limit'] = theparams?.limit;
	if (theparams?.offset) params['offset'] = theparams?.offset;
	if (theparams?.id) params['CAS_ID_PK'] = theparams?.id;
	if (theparams?.searchVal) params['search'] = theparams?.searchVal;
	// console.log("params", params)
	const res = await axios.get(`${api_url}/stage/`, {
		params: params,
		headers: axiosConfig,
	});
	// console.log(res);
	return res.data;
});

//getStageData
export const getStageData = createAsyncThunk('stage/getData', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/stage/?CAS_ID_PK=${id}`, {
		headers: axiosConfig,
	});

	// console.log(res.data);
	return res.data;
});

// getStageById
export const getStageById = createAsyncThunk('stage/getStage', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/stage/${id}`, {
		// params: {total: true, STG_ID_PK: id},
		headers: axiosConfig,
	});

	//   console.log(res.data)
	return res.data;
});

//get Attahcment for Stage
export const getStageAttachment = createAsyncThunk('Stage/StageAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/Stage/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getStageAttachmentData = createAsyncThunk('Stage/StageAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/Stage/${id}/attachment/${attachedId}`, {
		method: 'GET',
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//delete attachment
export const deleteAttachment = createAsyncThunk('stage/deleteAttachedstage', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/Stage/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//export const add new file
export const addNewStage = createAsyncThunk('stage/addNewStage', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/stage`, data, {
		headers: axiosConfig,
	});
	return res.data;
});

//update stage
export const updateStage = createAsyncThunk('stage/updateStage', async ({data, id}, thunkAPI) => {
	const res = await axios.put(`${api_url}/stage/${id}`, data, {
		headers: axiosConfig,
	});
	return { id, data, res };
});

//delete stage
export const deleteStage = createAsyncThunk('stage/deleteStage', async ({id, casId}, thunkAPI) => {
	const res = await axios.delete(`${api_url}/stage/${id}/${casId}`, {
		headers: axiosConfig,
	});
	return { id, res };
});

//report table design
export const reportTableDesign = createAsyncThunk('stage/reportTableDesign', async(data, thunkAPI) => {
	const {rejectWithValue} = thunkAPI
	try {
		const res = await axios.post(`${api_url}/stage/report`,data, {
			headers: axiosConfig,
		});
		//   console.log(res);
		return { res };
	} catch (error) {
		return rejectWithValue(error.message);
	}
})

const stageSlice = createSlice({
	name: 'stage',
	initialState: {
		allStages: [],
		isLoadingStages: false,
		error: null,
		selectedStages: null,
		theAllStages: [],
	},
	extraReducers: {
		//get all stages
		[getAllStages.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.theAllStages = action.payload;
			state.isLoadingStages = false;
			state.error = null;
		},
		[getStageData.fulfilled]: (state, action) => {
			// console.log("action.payload.data: ", action.payload.data)
			state.allStages = action.payload.data?.sort((a, b) => (a.STG_DATE > b.STG_DATE ? -1 : 1));
			state.isLoadingStages = false;
			state.error = null;
		},
		//getStageByID
		[getStageById.fulfilled]: (state, action) => {
			state.selectedStages = action.payload;
			state.isLoadingStages = false;
			state.error = null;
		},
		[addNewStage.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoading = false;
			state.allStages.data?.unshift(action.payload);
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[updateStage.fulfilled]: (state, action) => {
			console.log('action.payload', action.payload);
			state.isLoading = false;
			// const updatedIndex = state.allStages?.data?.findIndex((ele) => ele.STG_ID_PK == action.payload.id);
			// const allCopy = state.allStages.data;
			// allCopy[updatedIndex] = action.payload.data;
			// state.allStages = {total: state.allStages.total, data: allCopy};
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[deleteStage.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			state.allStages = {data: state.allStages.data?.filter(ele => ele.STG_ID_PK != action.payload.id), total: state.allStages.total-1};
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
	},
});

export default stageSlice.reducer;
