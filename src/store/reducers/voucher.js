import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

// get vouchers
export const getAllvouchers = createAsyncThunk('voucher/getAll', async ({ theParams }) => {
	const params = {};
	if (true) params['total'] = true;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.contractId) params['COR_ID_PK'] = theParams.contractId;
	// if (true) params['limit'] = '10';
	const res = await axios.get(`${api_url}/voucher`, {
		headers: axiosConfig,
		params: params,
	});
	// console.log("res: ", res)
	return res.data;
});
// get voucher
export const getThevoucher = createAsyncThunk('voucher/getVoucher', async (id) => {
	const res = await axios.get(`${api_url}/voucher/${id}`, {
		headers: axiosConfig,
	});
	// console.log("res: ", res)
	return res.data;
});

// add voucher
export const addvoucher = createAsyncThunk('voucher/addVoucher', async (data) => {
	const res = await axios.post(`${api_url}/voucher`, data, {
		headers: axiosConfig,
	});
	// console.log(res.data)
	return res.data;
});

// update voucher
export const updatevoucher = createAsyncThunk('voucher/updatevoucher', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/voucher/${id}`, data, {
		headers: axiosConfig,
	});
	let result;
	// console.log(res, data)
	if (!res.ok) {
		result = res.data;
	}
	// console.log(result)
	return { id, data, res: result };
});

// delete voucher
export const deletevoucher = createAsyncThunk('voucher/deletevoucher', async (id, thunkAPI) => {
	const res = await axios.delete(`${api_url}/voucher/${id}`, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { id, res };
});

//get Attahcment for voucher
export const getvoucherAttachment = createAsyncThunk('voucher/voucherAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/voucher/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getvoucherAttachmentData = createAsyncThunk('voucher/voucherAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/voucher/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//delete attachment
export const deleteAttachment = createAsyncThunk('voucher/deleteAttachedvoucher', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/voucher/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const voucherSlice = createSlice({
	name: 'voucher',
	initialState: {
		allvouchers: [],
		loading: false,
		error: null,
	},
	extraReducers: {
		[getAllvouchers.fulfilled]: (state, action) => {
			state.allvouchers = action.payload;
		},
		[addvoucher.fulfilled]: (state, action) => {
			// console.log(action.payload)
			if (!action.payload?.code) {
				state.allvouchers.data.unshift(action.payload);
			}
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[updatevoucher.fulfilled]: (state, action) => {
			const findIndex = state.allvouchers.data.filter((ele) => ele.PAY_ID_PK == action.payload.id);
			const allCopy = [...state.allvouchers.data];
			allCopy[findIndex] = action.payload.data;
			state.allvouchers.data = allCopy;
		},
		[deletevoucher.fulfilled]: (state, action) => {
			state.allvouchers = { data: state.allvouchers.data.filter((ele) => ele.PAY_ID_PK != action.payload.id), total: state.allvouchers.total - 1 };
		},
	},
});

export default voucherSlice.reducer;
