import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

export const getContracts = createAsyncThunk('contract/allContract', async ({ theParams }, thunkAPI) => {
	// console.log(token)

	// console.log("theParams",theParams)
	const params = {};
	if (true) params['total'] = true;
	if (true) params['limit'] = '10';
	if (theParams?.CorNumSearch) params['COR_NUMBER'] = theParams?.CorNumSearch;
	if (theParams?.corDateFrom) params['COR_DATE_GTE'] = new Date(theParams?.corDateFrom)?.toLocaleDateString();
	if (theParams?.corDateTo) params['COR_DATE_LTE'] = new Date(theParams?.corDateTo)?.toLocaleDateString();
	if (theParams?.corAmountFrom) params['COR_AMOUNT_GTE'] = theParams?.corAmountFrom;
	if (theParams?.coreAmountTo) params['COR_AMOUNT_LTE'] = theParams?.coreAmountTo;
	if (theParams?.nameSearch) params['CLI_NAME'] = theParams?.nameSearch;
	if (theParams?.searchVal) params['search'] = theParams?.searchVal;
	if (theParams?.selctedVal) params['COR_KIND'] = theParams?.selctedVal;
	if (theParams?.offset) params['offset'] = theParams?.offset;
	const res = await axios.get(`${api_url}/contract`, {
		params: params,
		headers: axiosConfig,
	});

	// console.log(res)
	return res.data;
});

// get agency by id
export const getContractById = createAsyncThunk('contract/contractById', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/contract/${id}`, {
		headers: axiosConfig,
	});
	// console.log(result)
	return res.data;
});

//get Attahcment for contract
export const getcontractAttachment = createAsyncThunk('contract/contractAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/contract/${id}/attachment`, {
		headers: axiosConfig,
	});
	// console.log("result: ", res)
	return res.data;
});

// get file for attachment
export const getcontractAttachmentData = createAsyncThunk('contract/contractAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/contract/${id}/attachment/${attachedId}`, {
		headers: {
			headers: axiosConfig,
		},
		responseType: 'blob',
	});
	console.log('result', result);
	const blob =  result.data;
	getAttachmentData(fileName, blob, result);
	return result;
});

//delete Attachment
export const deleteAttachment = createAsyncThunk('contract/deleteAttachedcontract', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/contract/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});
// getConsultContracts
export const getConsultContracts = createAsyncThunk('contract/contractconsult', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/contract/?total=true&COR_KIND=1`, {
		headers: axiosConfig,
	});
	//   console.log(result.data)
	return res.data.data;
});

// getConsultStgContracts
export const getConsultStgContracts = createAsyncThunk('contract/contractStagesconsult', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/contract/?total=true&COR_KIND=2`, {
		headers: axiosConfig,
	});

	//   console.log(result.data)
	return res.data.data;
});

// getStgContracts
export const getStgContracts = createAsyncThunk('contract/contractStages', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/contract/?total=true&COR_KIND=0`, {
		headers: axiosConfig,
	});

	//   console.log(result.data)
	return res.data.data;
});

// getContractUnAttached
export const getContractUnAttached = createAsyncThunk('contract/contractUnAttached', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/contract/?total=true&_FILE=0`, {
		headers: axiosConfig,
	});

	//   console.log(result.data)
	return res.data.data;
});

//export const add new contract
export const addNewContract = createAsyncThunk('contract/addNewContract', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/contract`, data, {
		headers: axiosConfig,
	});
	return res.data;
});

//update contract
export const updateContract = createAsyncThunk('contract/updateContract', async ({ data,  id}, thunkAPI) => {
	const res = await axios.put(`${api_url}/contract/${id}`, data, {
		headers: axiosConfig,
	});
	return { id, data, res };
});

//delete contract
export const deleteContract = createAsyncThunk('contract/deleteContract', async (id, thunkAPI) => {
	const res = await axios.delete(`${api_url}/contract/${id}`, {
		headers: axiosConfig,
	});
	return { id, res };
});

const contractSlice = createSlice({
	name: 'contract',
	initialState: {
		allContrcts: [],
		isLoadingContract: false,
		error: null,
		contractById: null,
		stagesContract: null,
		consultingContract: null,
		stgConsultContract: null,
		contractUnAttached: null,
	},
	extraReducers: {
		[getContracts.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getContracts.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoadingContract = false;
			state.allContrcts = action.payload;
			state.error = null;
		},
		[getContracts.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},

		// get case by id
		[getContractById.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getContractById.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContract = false;
			state.contractById = action.payload;
			state.error = null;
		},
		[getContractById.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},

		// getConsultContracts
		[getConsultContracts.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getConsultContracts.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContract = false;
			state.consultingContract = action.payload;
			state.error = null;
		},
		[getConsultContracts.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},

		// getConsultStgContracts
		[getConsultStgContracts.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getConsultStgContracts.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContract = false;
			state.stgConsultContract = action.payload;
			state.error = null;
		},
		[getConsultStgContracts.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},

		//getStgContracts
		[getStgContracts.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getStgContracts.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContract = false;
			state.stagesContract = action.payload;
			state.error = null;
		},
		[getStgContracts.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},

		//getContractUnAttached
		[getContractUnAttached.pending]: (state, action) => {
			state.isLoadingContract = true;
			state.error = null;
		},
		[getContractUnAttached.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContract = false;
			state.contractUnAttached = action.payload;
			state.error = null;
		},
		[getContractUnAttached.rejected]: (state, action) => {
			state.isLoadingContract = false;
			state.error = action.payload;
		},

		[addNewContract.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoading = false;
			state.allContrcts.data?.push(action.payload);
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[updateContract.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			const updatedIndex = state.allContrcts.data?.findIndex((ele) => ele.COR_ID_PK == action.payload.id);
			const allContrctsCopy = [...state.allContrcts.data];
			allContrctsCopy[updatedIndex] = action.payload.data;
			state.allContrcts.data = allContrctsCopy;
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
		[deleteContract.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			state.allContrcts= {data: state.allContrcts.data?.filter((ele) => ele.COR_ID_PK != action.payload.id), total: state.allContrcts.total};
			if (action.payload?.code) {
				state.error = action.payload;
			}
		},
	},
});

export default contractSlice.reducer;
