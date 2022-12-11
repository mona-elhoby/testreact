import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../config';
import { getAttachmentData } from './utils';

//getSessionData
export const getSessionData = createAsyncThunk('session/getData', async ({ theParams }, thunkAPI) => {
	// console.log("theParams", theParams)

	const params = {};
	if (true) params['total'] = true;
	if (true) params['view'] = 'List';
	if (theParams.limit) params['limit'] = theParams.limit;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.id) params['CAS_ID_PK'] = theParams.id;
	if (theParams.stgNumSearch) params['STG_ID_PK'] = theParams.stgNumSearch;
	if (theParams.stgSubjectSearch) params['FULL_STAGE_NAME'] = theParams.stgSubjectSearch;
	if (theParams.placeSearch) params['SES_PLACE_NAME'] = theParams.placeSearch;
	if (theParams.searchVal) params['search'] = theParams.searchVal;
	if (theParams.sesSearchDateFrom) params['SES_DATE_GTE'] = new Date(theParams.sesSearchDateFrom).toLocaleDateString();
	if (theParams.sesSearchDateTo) params['SES_DATE_LTE'] = new Date(theParams.sesSearchDateTo).toLocaleDateString();
	const res = await axios.get(`${api_url}/session/`, {
		params: params,
		headers: axiosConfig,
	});
	return res.data;
});

// getSessionById
export const getSessionById = createAsyncThunk('session/getSession', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/session/${id}`, {
		headers: axiosConfig,
	});

	//   console.log(result)
	return res.data;
});

//getSession for stage
export const getAllSession = createAsyncThunk('session/getAllSession', async ({ theParams }, thunkAPI) => {
	const params = {};
	if (true) params['total'] = true;
	if (true) params['view'] = 'List';
	if (theParams.limit) params['limit'] = theParams.limit;
	if (theParams.offset) params['offset'] = theParams.offset;
	if (theParams.sesSearchDateFrom) params['SES_DATE_GTE'] = new Date(theParams.sesSearchDateFrom).toLocaleDateString();
	if (theParams.sesSearchDateTo) params['SES_DATE_LTE'] = new Date(theParams.sesSearchDateTo).toLocaleDateString();
	const res = await axios.get(`${api_url}/session/`, { params: params, headers: axiosConfig });

	// console.log(res)
	return res.data;
});

//add session
export const addNewSession = createAsyncThunk('session/addSession', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/session`, data, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, data };
});

//update session
export const updateSession = createAsyncThunk('session/updateSession', async ({ id, data }, thunkAPI) => {
	const res = await axios.put(`${api_url}/session/${id}`, data, {
		headers: axiosConfig,
	});
	// console.log(res);
	return { res, id, data };
});

//delete session
export const deleteSession = createAsyncThunk('session/deleteSession', async (id, thunkAPI) => {
	const result = await axios.delete(`${api_url}/session/${id}`, {
		headers: axiosConfig,
	});
	//   console.log(res);
	return { result, id };
});

//get Attahcment for session
export const getsessionAttachment = createAsyncThunk('session/sessionAttachment', async (id, thunkAPI) => {
	const res = await axios.get(`${api_url}/session/${id}/attachment`, {
		headers: axiosConfig,
	});

	// console.log(result)
	return res.data;
});

// get file for attachment
export const getsessionAttachmentData = createAsyncThunk('session/sessionAttachmentData', async ({ id, attachedId, fileName }, thunkAPI) => {
	const result = await axios.get(`${api_url}/session/${id}/attachment/${attachedId}`, {
		method: 'GET',
		headers: axiosConfig,
		responseType: 'blob',
	});
	const blob = await result.data;
	getAttachmentData(fileName, blob);
	console.log(fileName);
	return result.data;
});


//delete attachment
export const deleteAttachment = createAsyncThunk('session/deleteAttachedsession', async ({ id, deletedId }, thunkAPI) => {
	// console.log(id, deletedId)
	const { rejectWithValue } = thunkAPI; //handle error in correct way
	try {
		const res = await axios.delete(`${api_url}/session/${id}/attachment/${deletedId}`, { headers: axiosConfig });
		//   console.log(res);
		return { res, id };
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

//report table design
export const reportTableDesign = createAsyncThunk('session/reportTableDesign', async(data, thunkAPI) => {
	const {rejectWithValue} = thunkAPI
	try {
		const res = await axios.post(`${api_url}/session/report`,data, {
			headers: axiosConfig,
		});
		//   console.log(res);
		return { res };
	} catch (error) {
		return rejectWithValue(error.message);
	}
})


const sessionSlice = createSlice({
	name: 'session',
	initialState: {
		allSessions: [],
		allTheSessions: [],
		isLoadingSession: false,
		error: null,
		selectedSession: null,
	},
	extraReducers: {
		[getSessionData.pending]: (state, action) => {
			state.isLoadingSession = true;
			state.error = null;
		},
		[getSessionData.fulfilled]: (state, action) => {
			//   console.log("action.payload", action.payload?.data?.sort((a, b) => (a?.SES_DATE > b?.SES_DATE ? -1 : 1)));
			state.isLoadingSession = false;
			// state.allSessions = action.payload;
			state.allSessions = {total: action.payload.total, data: action.payload?.data?.sort((a, b) => (a?.SES_DATE > b?.SES_DATE ? -1 : 1))};
			state.error = null;
		},
		[getSessionData.rejected]: (state, action) => {
			state.isLoadingSession = false;
			state.error = action.payload;
		},

		//getSessionById
		[getSessionById.pending]: (state, action) => {
			state.isLoadingSession = true;
			state.error = null;
		},
		[getSessionById.fulfilled]: (state, action) => {
			//   console.log("action.payload", action.payload);
			state.isLoadingSession = false;
			state.selectedSession = action.payload;
			state.error = null;
		},
		[getSessionById.rejected]: (state, action) => {
			state.isLoadingSession = false;
			state.error = action.payload;
		},

		//get all sessions
		[getAllSession.fulfilled]: (state, action) => {
			state.isLoadingSession = false;
			state.allTheSessions = action.payload;
			state.error = null;
		},

		//addSession
		[addNewSession.pending]: (state, action) => {
			state.isLoadingSession = true;
			state.error = null;
		},
		[addNewSession.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingSession = false;
			if (action?.payload?.result?.code) {
				return;
			} else {
				state.allSessions.data.unshift(action.payload.data);
			}
			state.error = null;
		},
		[addNewSession.rejected]: (state, action) => {
			state.isLoadingSession = false;
			state.error = action.payload;
		},

		//updateSession
		[updateSession.pending]: (state, action) => {
			state.isLoadingSession = true;
			state.error = null;
		},
		[updateSession.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.isLoadingSession = false;
			const updatedSessionIndex = state.allSessions.data.findIndex((ele) => ele.SES_ID_PK == action.payload.id);
			const allSessionsCopy = [...state.allSessions.data];
			allSessionsCopy[updatedSessionIndex] = action.payload.data;
			state.allSessions.data = allSessionsCopy;
			state.error = null;
		},
		[updateSession.rejected]: (state, action) => {
			state.isLoadingSession = false;
			state.error = action.payload;
		},

		//deleteSession
		[deleteSession.pending]: (state, action) => {
			state.isLoadingSession = true;
			state.error = null;
		},
		[deleteSession.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.allSessions = {total: action.payload.total, data: state.allSessions.data?.filter((ele) => ele.SES_ID_PK != action.payload.id)};
			state.error = null;
		},
		[deleteSession.rejected]: (state, action) => {
			state.isLoadingSession = false;
			state.error = action.payload;
		},
	},
});

export default sessionSlice.reducer;
