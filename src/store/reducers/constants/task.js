import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, axiosConfig } from '../../config';



//execut type
export const getTaskType = createAsyncThunk('constraint/getTaskType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/task-type?total=true&TSK_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//execut type
export const setTaskType = createAsyncThunk('constraint/setTaskType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/task-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

const TaskConstants = createSlice({
	name: 'constraint',
	initialState: {
		theTaskTypeCompo: [],
		error: [],
	},
	extraReducers: {
		[getTaskType.fulfilled]: (state, action) => {
			// console.log("action.payload: ", action.payload)
			state.theTaskTypeCompo = action.payload;
			state.error = null;
		},
	},
});

export default TaskConstants.reducer;
