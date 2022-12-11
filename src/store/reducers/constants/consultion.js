import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';


//execut type
export const getConsultionsType = createAsyncThunk('constraint/getConsultionsType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/consultation-type?total=true&CON_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//execut type
export const setConsultionsType = createAsyncThunk('constraint/setConsultionsType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/consultation-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

const ConsultionsConstants = createSlice({
	name: 'constraint',
	initialState: {
		theConsultionsTypeCompo: [],
		error: [],
	},
	extraReducers: {
		[getConsultionsType.fulfilled]: (state, action) => {
			state.theConsultionsTypeCompo = action.payload;
			state.error = null;
		},
	},
});

export default ConsultionsConstants.reducer;
