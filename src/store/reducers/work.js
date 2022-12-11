import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

//getWorkData
export const getWorkData = createAsyncThunk('work/getData', async ({ theParams }, thunkAPI) => {
	// console.log('token', token);

	const params = {};
	if (true) params['total'] = true;
	if (true) params['view'] = 'List';
	if (theParams.limit) params['limit'] = theParams.limit;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.clientNameSearch) params['EMP_NAME'] = theParams.clientNameSearch;
	if (theParams.statusWorkSearch) params['STATUS_ID'] = theParams.statusWorkSearch;
	if (theParams.wrkTypeSearch) params['WRK_TYPE_NAME'] = theParams.wrkTypeSearch;
	if (theParams.wrkCreatDateSearchFrom) params['CREATE_DATE_GTE'] = new Date(theParams.wrkCreatDateSearchFrom).toLocaleDateString();
	if (theParams.wrkCreatDateSearchTo) params['CREATE_DATE_LTE'] = new Date(theParams.wrkCreatDateSearchTo).toLocaleDateString();
	if (theParams.wrkLastDateSearchFrom) params['WRK_DATE_LAST_GTE'] = new Date(theParams.wrkLastDateSearchFrom).toLocaleDateString();
	if (theParams.wrkLastDateSearchTo) params['WRK_DATE_LAST_LTE'] = new Date(theParams.wrkLastDateSearchTo).toLocaleDateString();
	if (theParams.searchVal) params['search'] = theParams.searchVal;
	const res = await axios.get(`${api_url}/work/`, {
		params: params,
		headers: axiosConfig,
	});
	// console.log(res);

	// console.log(res);
	return res.data;
});

//getWorkData
export const getAllWorks = createAsyncThunk('work/getAllWork', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/work/?total=true`, {
		headers: axiosConfig,
	});

	// console.log(res.data);
	return res.data;
});

// getWorkById
export const getWorkById = createAsyncThunk('work/getWork', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/work/${id}`, {
		headers: axiosConfig,
	});
	return res.data;
});

//get Attahcment for work
export const getWorkAttachment = createAsyncThunk('work/workAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/Work/${id}/attachment`, {
		headers: axiosConfig,
	});
	// console.log(res)
	return res.data;
});

// get file for attachment
export const getWorkAttachmentData = createAsyncThunk('work/workAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const res = await axios.get(`${api_url}/Work/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await res.blob();
	getAttachmentData(fileName, blob);
	console.log(fileName);
	console.log(res)
	return res.data;
});


//delete attachment
export const deleteAttachment = createAsyncThunk('Work/deleteAttachedWork', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/Work/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//add work
export const addNewWork = createAsyncThunk('work/addWork', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/work`, data, {
		headers: axiosConfig,
		
	});

	// console.log(res);
	return { res, data };
});

//update work
export const updateWork = createAsyncThunk('work/updateWork', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/work/${id}`, data, {
		headers: axiosConfig,
	});
	console.log(res);
	return { res, id, data };
});

//delete work
export const deleteWork = createAsyncThunk('work/deleteWork', async (id, thunkAPI) => {
	const res = await axios.delete(`${api_url}/work/${id}`, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, id };
});

const workSlice = createSlice({
	name: 'work',
	initialState: {
		allWorks: [],
		allTheWorks: [],
		isLoadingWork: false,
		error: null,
		selectedWork: null,
	},
	extraReducers: {
		[getWorkData.pending]: (state, action) => {
			state.isLoadingWork = true;
			state.error = null;
		},
		[getWorkData.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingWork = false;
			state.allWorks = action.payload;
			state.error = null;
		},
		[getWorkData.rejected]: (state, action) => {
			state.isLoadingWork = false;
			state.error = action.payload;
		},
		[getAllWorks.fulfilled]: (state, action) => {
			state.isLoadingWork = false;
			state.allTheWorks = action.payload;
			state.error = null;
		},

		//getWorkById
		[getWorkById.pending]: (state, action) => {
			state.isLoadingWork = true;
			state.error = null;
		},
		[getWorkById.fulfilled]: (state, action) => {
			//   console.log("action.payload", action.payload);
			state.isLoadingWork = false;
			state.selectedWork = action.payload;
			state.error = null;
		},
		[getWorkById.rejected]: (state, action) => {
			state.isLoadingWork = false;
			state.error = action.payload;
		},

		//addWork
		[addNewWork.pending]: (state, action) => {
			state.isLoadingWork = true;
			state.error = null;
		},
		[addNewWork.fulfilled]: (state, action) => {
			//   console.log("action.payload", action.payload);
			state.isLoadingWork = false;
			if (action?.payload?.res?.code) {
				return;
			} else {
				state.allWorks?.data.unshift(action.payload.data);
			}
			state.error = null;
		},
		[addNewWork.rejected]: (state, action) => {
			state.isLoadingWork = false;
			state.error = action.payload;
		},

		//updateWork
		[updateWork.pending]: (state, action) => {
			state.isLoadingWork = true;
			state.error = null;
		},
		[updateWork.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingWork = false;
			const updatedWorkIndex = state.allWorks?.data?.findIndex((ele) => ele.CLI_ID_PK == action.payload.id);
			const allWorksCopy = [...state.allWorks?.data];
			allWorksCopy[updatedWorkIndex] = action.payload.data;
			state.allWorks.data = allWorksCopy;
			state.error = null;
		},
		[updateWork.rejected]: (state, action) => {
			state.isLoadingWork = false;
			state.error = action.payload;
		},

		//deleteWork
		[deleteWork.pending]: (state, action) => {
			state.isLoadingWork = true;
			state.error = null;
		},
		[deleteWork.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allWorks = { ...state.allWorks, data: state.allWorks?.data.filter((ele) => ele.WRK_ID_PK != action.payload.id) };
			state.error = null;
		},
		[deleteWork.rejected]: (state, action) => {
			state.isLoadingWork = false;
			state.error = action.payload;
		},
	},
});

export default workSlice.reducer;
