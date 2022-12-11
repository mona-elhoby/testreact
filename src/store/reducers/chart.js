import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';

export const getChart = createAsyncThunk('chart/getChart', async ({mainNameChart,chartType,durationType,fromDate,toDate}, thunkAPI) => {
		const res = await axios.get(`${api_url}/chart/${mainNameChart}/?chart_type=${chartType}&duration_type=${durationType}&from_date=${fromDate}&to_date=${toDate}`, {
			headers : axiosConfig,
		});
		return res.data.data;
});
const chartSlice = createSlice({
	name: 'agency',
	initialState: {
		chart: [],
	},
	extraReducers: {
        [getChart.fulfilled]: (state, action) => {
            state.chart = action.payload
        }
    }
})

export default chartSlice.reducer;

