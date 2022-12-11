import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, axiosConfig } from '../../config';



//voucher type
export const getVoucherType = createAsyncThunk('constraint/getVoucherType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/voucher-type?total=true&PAY_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//voucher type
export const setVoucherType = createAsyncThunk('constraint/setVoucherType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/voucher-type`, data, {
		headers: axiosConfig,
	});

	return res;
});
//voucher reason
export const getVoucherReason = createAsyncThunk('constraint/getVoucherReason', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/voucher-reason?total=true&PAY_REASON_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//voucher reason
export const setVoucherReason = createAsyncThunk('constraint/setVoucherReason', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/voucher-reason`, data, {
		headers: axiosConfig,
	});

	return res;
});
//voucher Status
export const getVoucherStatus = createAsyncThunk('constraint/getVoucherStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/voucher-status?total=true&PAY_STATUS_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//voucher Status
export const setVoucherStatus = createAsyncThunk('constraint/setVoucherStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/voucher-status`, data, {
		headers: axiosConfig,
	});

	return res;
});
//voucher Status
export const getTheBank = createAsyncThunk('constraint/getVoucherStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/voucher-bank?total=true&BNK_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//voucher Status
export const setTheBank = createAsyncThunk('constraint/setVoucherStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/voucher-bank`, data, {
		headers: axiosConfig,
	});

	return res;
});

const VoucherConstants = createSlice({
	name: 'constraint',
	initialState: {
		theVoucherTypeCompo: [],
		theVoucherReasonCompo: [],
		theVoucherStatusCompo: [],
		theBanksArr: [],
		error: [],
	},
	extraReducers: {
		[getVoucherType.fulfilled]: (state, action) => {
			state.theVoucherTypeCompo = action.payload;
			state.error = null;
		},
		[getVoucherReason.fulfilled]: (state, action) => {
			state.theVoucherReasonCompo = action.payload;
			state.error = null;
		},
		[getVoucherStatus.fulfilled]: (state, action) => {
			state.theVoucherStatusCompo = action.payload;
			state.error = null;
		},
		[getTheBank.fulfilled]: (state, action) => {
			state.theBanksArr = action.payload;
			state.error = null;
		},
	},
});

export default VoucherConstants.reducer;
