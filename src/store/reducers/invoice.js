import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

// get invoices
export const getAllInvoices = createAsyncThunk('invoice/getAll', async({theParams})=> {
    const params = {};
    if (true) params['total'] = true;
    if (theParams.id) params['CAS_ID_PK'] = theParams.id
    // if (true) params['limit'] = '10';
    const res = await axios.get(`${api_url}/invoice`,{
        headers: axiosConfig,
        params: params
    })
    // console.log(res)
    return res.data
})

// get invoice By Id
export const getInvoice = createAsyncThunk('invoice/getOne', async(id)=> {
    const res = await axios.get(`${api_url}/invoice/${id}`,{
        headers: axiosConfig
    })
    // console.log(res)
    return res.data
})


// add invoice
export const addInvoice = createAsyncThunk('invoice/addInoice', async(data)=> {
    const res = await axios.post(`${api_url}/invoice`,data, {
        headers: axiosConfig,
    })
    console.log(res.data)
    return res.data
})

// update invoice
export const updateInvoice = createAsyncThunk('invoice/updateInvoice', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/invoice/${id}`, data, {
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

// delete invoice
export const deleteInvoice = createAsyncThunk('invoice/deleteInvoice', async (id, thunkAPI) => {
	const res = await axios.delete(`${api_url}/invoice/${id}`, {
		headers: axiosConfig,
	});
	console.log(res);
	return { id, res };
});
//get Attahcment for Invoice
export const getInvoiceAttachment = createAsyncThunk('Invoice/InvoiceAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/invoice/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getInvoiceAttachmentData = createAsyncThunk('Invoice/InvoiceAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/invoice/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});

//delete attachment
export const deleteAttachment = createAsyncThunk('invoice/deleteAttachedinvoice', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/invoice/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const invoiceSlice = createSlice({
	name: 'invoice',
	initialState: {
		allInvoices: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getAllInvoices.fulfilled]: (state, action) => {
            state.allInvoices = action.payload
        },
        [addInvoice.fulfilled]: (state, action) => {
            // console.log(state.allInvoices)
            state.allInvoices.data.push(action.payload)
			if (action.payload?.code) {
				state.error = action.payload;
			}
        },
        [updateInvoice.fulfilled]: (state, action) => {
        const findIndex = state.allInvoices.data.filter(ele=> ele.INV_ID_PK == action.payload.id)
        const allCopy = [...state.allInvoices.data]
        allCopy[findIndex] = action.payload.data
        state.allInvoices.data = allCopy
        },
        [deleteInvoice.fulfilled]: (state, action) => {
            state.allInvoices = {data: state.allInvoices.data.filter(ele=> ele.INV_ID_PK != action.payload.id), total: state.allInvoices.total - 1}
        },
    }
})

export default invoiceSlice.reducer;