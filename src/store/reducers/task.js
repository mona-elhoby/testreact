import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';
//getTasksData
export const getTasksData = createAsyncThunk('Tasks/getData', async ({ theParams }, thunkAPI) => {
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
	const res = await axios.get(`${api_url}/task`, {
		params: params,
		headers: axiosConfig,
	});
	// console.log(res);
	return res.data;
});

//getTasksById
export const getTasksById = createAsyncThunk('Tasks/getTasks', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/task/${id}`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

//add Tasks
export const addNewTasks = createAsyncThunk('task/addTasks', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/task/`, data,{
		headers: axiosConfig,
	});
	return { res, data };
});

//update Tasks
export const updateTasks = createAsyncThunk('Tasks/updateTasks', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/task/${id}`, data, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, id, data };
});

//delete Tasks
export const deleteTasks = createAsyncThunk('Tasks/deleteTasks', async (id, thunkAPI) => {
	const result = await axios.delete(`${api_url}/task/${id}`, {
		headers: axiosConfig,
	});
	// console.log(result)
	return { result, id };
});

//get Attahcment for Tasks
export const getTasksAttachment = createAsyncThunk('Tasks/TasksAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/task/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getTasksAttachmentData = createAsyncThunk('Tasks/TasksAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/task/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});
//delete attachment
export const deleteAttachment = createAsyncThunk('task/deleteAttachedtask', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/task/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//report table design
export const reportTableDesign = createAsyncThunk('task/reportTableDesign', async(data, thunkAPI) => {
	const {rejectWithValue} = thunkAPI
	try {
		const res = await axios.post(`${api_url}/task/report`,data, {
			headers: axiosConfig,
		});
		//   console.log(res);
		return { res };
	} catch (error) {
		return rejectWithValue(error.message);
	}
})

const Taskslice = createSlice({
	name: 'Tasks',
	initialState: {
		allTasks: [],
		isLoadingTasks: false,
		error: null,
		selectedTasks: null,
	},
	extraReducers: {
		// update state
		[getTasksData.fulfilled]: (state, action) => {
			// console.log("action: ", action.payload)
			state.allTasks = action.payload;
			state.isLoadingTasks = false;
			state.error = null;
		},

		[getTasksById.fulfilled]: (state, action) => {
			state.selectedTasks = action.payload;
			state.isLoadingTasks = false;
			state.error = null;
		},
		//add Tasks
		[addNewTasks.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingTasks = false;
			if (action?.payload?.res?.data?.code) {
				return;
			} else {
				state.allTasks.data.unshift(action.payload.data);
			}
			state.error = null;
		},
		//update Tasks
		[updateTasks.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingTasks = false;
			const updatedTasksIndex = state.allTasks.data?.findIndex((ele) => ele.TSK_ID_PK == action.payload.id);
			const allTasksCopy = [...state.allTasks.data];
			allTasksCopy[updatedTasksIndex] = action.payload.data;
			state.allTasks.data = allTasksCopy;
			state.error = null;
		},
		//delete Tasks
		[deleteTasks.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allTasks = {total:state.allTasks.total, data: state.allTasks?.data?.filter((ele) => ele.TSK_ID_PK != action.payload.id)};
			state.error = null;
		},
	},
});

export default Taskslice.reducer;
