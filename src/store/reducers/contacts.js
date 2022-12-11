import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

export const getContacts = createAsyncThunk('contact/getContacts', async ({ theParams }, thunkAPI) => {
	// console.log("theParams", theParams)

	const params = {};
	if (true) params['total'] = true;
	if (true) params['limit'] = '10';
	if (theParams?.limit) params['limit'] = theParams?.limit;
	if (theParams?.classification0) params['classification[0]'] = theParams?.classification0;
	if (theParams?.classification1) params['classification[1]'] = theParams?.classification1;
	if (theParams?.offset) params['offset'] = theParams?.offset;
	if (theParams?.nameSearch) params['CLI_NAME'] = theParams?.nameSearch;
	if (theParams?.categorySearch) params['cli_category'] = theParams?.categorySearch;
	if (theParams?.phoneSearch) params['phone'] = theParams?.phoneSearch;
	if (theParams?.mobileSearch) params['mobile'] = theParams?.mobileSearch;
	if (theParams?.emailSearch) params['email'] = theParams?.emailSearch;
	if (theParams?.addressSearch) params['address'] = theParams?.addressSearch;
	if (theParams?.searchVal) params['search'] = theParams?.searchVal;
	if (theParams?.offset) params['offset'] = theParams?.offset;

	const res = await axios.get(`${api_url}/client/`, {
		params: params,
		headers: axiosConfig,
	});
	// console.log("result",res)
	return res.data
});

// get contact by id
export const getProfile = createAsyncThunk('contact/profile', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/client/${id}`, {
		headers: axiosConfig,
	});

	return res.data;
});

//get Attahcment for client
export const getclientAttachment = createAsyncThunk('client/clientAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/client/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getclientAttachmentData = createAsyncThunk('client/clientAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/client/${id}/attachment/${attachedId}`, {
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	// console.log(fileName);
	return result.data;
});

//delete Attachment
export const deleteAttachment = createAsyncThunk('client/deleteAttachedclient', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/client/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// add new contact
export const addNewContact = createAsyncThunk('contact/addContact', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/client`, data, {
		headers: axiosConfig,
	});
	return res.data;
});

// update contact
export const updateContact = createAsyncThunk('contact/updateContact', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/client/${id}`, data, {
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

export const deleteContact = createAsyncThunk('contact/deleteContact', async (id, thunkAPI) => {
	const res = await axios.delete(`${api_url}/client/${id}`, {
		headers: axiosConfig,
	});
	console.log(res);
	return { id, res };
});

export const contactSlice = createSlice({
	name: 'contact',
	initialState: {
		allContacts: [],
		isLoadingContacts: false,
		contactError: null,
		profile: null,
		profileError: null,
	},
	extraReducers: {
		[getContacts.pending]: (state, action) => {
			state.isLoadingContacts = true;
			state.contactError = null;
		},
		[getContacts.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContacts = false;
			state.allContacts = action.payload;
			state.contactError = null;
		},
		[getContacts.rejected]: (state, action) => {
			state.isLoadingContacts = false;
			state.contactError = action.payload;
		},

		// get contact by id
		[getProfile.pending]: (state, action) => {
			state.isLoadingContacts = true;
			state.contactError = null;
		},
		[getProfile.fulfilled]: (state, action) => {
			// console.log(action.payload)
			state.isLoadingContacts = false;
			state.profile = action.payload;
			state.contactError = null;
		},
		[getProfile.rejected]: (state, action) => {
			state.isLoadingContacts = false;
			state.contactError = action.payload;
		},

		//add new contact
		[addNewContact.pending]: (state, action) => {
			state.isLoading = true;
			state.contactError = null;
		},
		[addNewContact.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.isLoading = false;
			state.allContacts.data?.unshift(action.payload);
			if (action.payload?.code) {
				state.contactError = action.payload;
			}
		},
		[addNewContact.rejected]: (state, action) => {
			state.isLoading = false;
			state.contactError = action.payload;
		},

		//update contact
		[updateContact.pending]: (state, action) => {
			state.isLoading = true;
			state.contactError = null;
		},
		[updateContact.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			// const updatedContactIndex = state.allContacts.data?.findIndex((ele) => ele.CLI_ID_PK == action.payload.id);
			// const allContactCopy = [...state.allContacts.data];
			// allContactCopy[updatedContactIndex] = action.payload.data;
			// state.allContacts.data = allContactCopy;
			// state.profile = state.allContacts.data[updatedContactIndex];
			if (action.payload?.code) {
				state.profileError = action.payload;
			}
		},
		[updateContact.rejected]: (state, action) => {
			state.isLoading = false;
			state.contactError = action.payload;
		},

		//delete Contact
		[deleteContact.pending]: (state, action) => {
			state.isLoading = true;
			state.contactError = null;
		},
		[deleteContact.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoading = false;
			// state.allContacts.filter(ele => ele != action.payload);
			if (action.payload?.code) {
				state.contactError = action.payload;
			}
		},
		[deleteContact.rejected]: (state, action) => {
			state.isLoading = false;
			state.contactError = action.payload;
		},
	},
});

export default contactSlice.reducer;
