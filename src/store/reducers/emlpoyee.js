import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';


// get company type
export const getEmployeeData = createAsyncThunk('employee/allEmployee', async (_, thunkAPI) => {
		const res = await axios.get(`${api_url}/employee/?total=true&view=List`, {
			headers: axiosConfig,
		});
		//   console.log(res.data)
		return res.data.data;
	
});

const employeeSlice = createSlice({
	name: 'employee',
	initialState: {
		allEmployee: [],
		isLoadingEmployee: false,
		error: null,
	},
	extraReducers: {
		[getEmployeeData.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getEmployeeData.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingContract = false;
			state.allEmployee = action.payload;
			state.error = null;
		},
		[getEmployeeData.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},
	},
});

export default employeeSlice.reducer;
