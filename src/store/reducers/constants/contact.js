import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';

// get company type
export const getCompanyTypeData = createAsyncThunk('constant/companiesTypes', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/company-type?total=true&CLI_COMPANYTYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

// get company name
export const getNationality = createAsyncThunk('constant/nationality', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/nationality?total=true&NAT_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

// set company type
export const setCompanyTypeData = createAsyncThunk('constant/setcompaniesTypes', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/company-type`, data, {
		headers: axiosConfig,
	});

	return { res, data };
});

// set company name
export const setNationality = createAsyncThunk('constant/setnationality', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/nationality`, data, {
		headers: axiosConfig,
	});

	// console.log(result)
	return { res, data };
});

const contactConstantSlice = createSlice({
	name: 'constant',
	initialState: {
		companiesTypes: [],
		theNationalities: [],
		error: [],
	},
	extraReducers: {
		[getCompanyTypeData.pending]: (state, action) => {
			state.error = null;
		},
		[getCompanyTypeData.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.companiesTypes = action.payload;
			state.error = null;
		},
		[getCompanyTypeData.rejected]: (state, action) => {
			state.error = action.payload;
		},
		// get nationality reducer
		[getNationality.pending]: (state, action) => {
			state.error = null;
		},
		[getNationality.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theNationalities = action.payload;
			state.error = null;
		},
		[getNationality.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export default contactConstantSlice.reducer;
