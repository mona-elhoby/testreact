import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';

// setInformingCategory
export const setInformingCategory = createAsyncThunk('constant/setInformingCategory', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/informing-category`, data, {
		headers: axiosConfig,
	});
	return { res, data };
});
// getInformingCategory
export const getInformingCategory = createAsyncThunk('constant/getInformingCategory', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/informing-category?total=true&INR_CATEGORY_STATUS=true`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data.data;
});

// setInformingPlace
export const setInformingPlace = createAsyncThunk('constant/setInformingPlace', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/informing-place`, data, {
		headers: axiosConfig,
	});
	return { res, data };
});

// getInformingPlace
export const getInformingPlace = createAsyncThunk('constant/getInformingPlace', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/informing-place?total=true&INR_PLACE_STATUS=true`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data.data;
});

// setInformingProcedure
export const setInformingProcedure = createAsyncThunk('constant/setInformingProcedure', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/informing-procedure`, data,{
		headers: axiosConfig,
	});

	// console.log(result)
	return { res, data };
});

// getInformingProcedure
export const getInformingProcedure = createAsyncThunk('constant/getInformingProcedure', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/informing-procedure?total=true&INR_PROCEDURE_STATUS=true`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data.data;
});

// setInformingStatus
export const setInformingStatus = createAsyncThunk('constant/setInformingStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/informing-status`, data,{
		headers: axiosConfig,
	});

	// console.log(result)
	return { res, data };
});

// getInformingStatus
export const getInformingStatus = createAsyncThunk('constant/getInformingStatus', async (_, thunkAPI) => {
	const res = await axios(`${api_url}/constraint/informing-status?total=true&INR_STATUS_STATUS=true`, {
		method: 'GET',
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data.data;
});

// setInformingType
export const setInformingType = createAsyncThunk('constant/setInformingType', async (data, thunkAPI) => {
	const res = await axios(`${api_url}/constraint/informing-type`, data, {
		method: 'POST',
		headers: axiosConfig,
	});
	console.log(res)
	return { res, data };
});
// getInformingType
export const getInformingType = createAsyncThunk('constant/getInformingType', async (_, thunkAPI) => {
	const res = await axios(`${api_url}/constraint/informing-type?total=true&INR_TYPE_STATUS=true`, {
		method: 'GET',
		headers: axiosConfig,
	});
	// console.log(res)
	return res.data?.data;
});

const informingConstantSlice = createSlice({
	name: 'constant',
	initialState: {
		ingormingCatetegoryList: [],
		ingormingPlaceList: [],
		ingormingProcedureList: [],
		ingormingStatusList: [],
		typeInformingList: [],
		error: [],
	},
	extraReducers: {
		[getInformingCategory.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.ingormingCatetegoryList = action.payload;
			state.error = null;
		},
		[getInformingPlace.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.ingormingPlaceList = action.payload;
			state.error = null;
		},
		[getInformingProcedure.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.ingormingProcedureList = action.payload;
			state.error = null;
		},
		[getInformingStatus.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.ingormingStatusList = action.payload;
			state.error = null;
		},
		[getInformingType.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.typeInformingList = action.payload;
			state.error = null;
		},
	},
});

export default informingConstantSlice.reducer;
