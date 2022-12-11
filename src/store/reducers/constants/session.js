import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, token, axiosConfig } from '../../config';

// get session decision
export const getSessionDecision = createAsyncThunk('constant/sessionDecision', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/session-decision?total=true&SES_DECISION_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// get session Place
export const getSessionPlace = createAsyncThunk('constant/sessionPlace', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/session-place?total=true&SES_PLACE_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// get session Roll
export const getSessionRoll = createAsyncThunk('constant/sessionRoll', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/session-role?total=true&SES_ROLL_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// get session Roll
export const getSessionType = createAsyncThunk('constant/sessionType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/session-type?total=true&SES_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// get session Requirement
export const getSessionRequired = createAsyncThunk('constant/sessionRequired', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/session-requirement?total=true&RTYPE_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// get session Judgement
export const getSessionJudgement = createAsyncThunk('constant/sessionJudgement', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/session-adjudication?total=true&ADJ_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});

	return res.data.data;
});

// set session decision
export const setSessionDecision = createAsyncThunk('constant/setsessionDecision', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/session-decision`, data,{
		headers: axiosConfig,
		
	});

	console.log(res);
	return { res, data };
});

// set session Place
export const setSessionPlace = createAsyncThunk('constant/setsessionPlace', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/session-place`, data, {
		headers: axiosConfig,
		
	});

	return { res, data };
});

// set session Roll
export const setSessionRoll = createAsyncThunk('constant/setSessionRoll', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/session-role`, data, {
		headers: axiosConfig,
		
	});

	return { res, data };
});

// set session Roll
export const setSessionType = createAsyncThunk('constant/setSessionType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/session-type`, data,{
		headers: axiosConfig,
		
	});
	
	return { res, data };
});

// set session Requirement
export const setSessionRequired = createAsyncThunk('constant/setSessionRequired', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/session-requirement`, data,{
		headers: axiosConfig,
		
	});

	return { res, data };
});

// set session Judgement
export const setSessionJudgement = createAsyncThunk('constant/sstSessionJudgement', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/session-adjudication`, data, {
		headers: axiosConfig,
		
	});

	// console.log(res)
	return { res, data };
});

const constantSessionSlice = createSlice({
	name: 'constant',
	initialState: {
		theSessionDecision: [],
		theSessionPlace: [],
		theSessionRoll: [],
		theSessionType: [],
		theSessionRequirements: [],
		theSessionJudgment: [],
		error: [],
	},
	extraReducers: {
		// get getSessionDecision reducer
		[getSessionDecision.pending]: (state, action) => {
			state.error = null;
		},
		[getSessionDecision.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theSessionDecision = action.payload;
			state.error = null;
		},
		[getSessionDecision.rejected]: (state, action) => {
			state.error = action.payload;
		},
		// get getSessionPlace reducer
		[getSessionPlace.pending]: (state, action) => {
			state.error = null;
		},
		[getSessionPlace.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theSessionPlace = action.payload;
			state.error = null;
		},
		[getSessionPlace.rejected]: (state, action) => {
			state.error = action.payload;
		},
		// get getSessionRoll reducer
		[getSessionRoll.pending]: (state, action) => {
			state.error = null;
		},
		[getSessionRoll.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theSessionRoll = action.payload;
			state.error = null;
		},
		[getSessionRoll.rejected]: (state, action) => {
			state.error = action.payload;
		},

		//getSessionType
		[getSessionType.pending]: (state, action) => {
			state.error = null;
		},
		[getSessionType.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theSessionType = action.payload;
			state.error = null;
		},
		[getSessionType.rejected]: (state, action) => {
			state.error = action.payload;
		},

		//getSessionRequired
		[getSessionRequired.pending]: (state, action) => {
			state.error = null;
		},
		[getSessionRequired.fulfilled]: (state, action) => {
			// console.log('action.payload', action.payload);
			state.theSessionRequirements = action.payload;
			state.error = null;
		},
		[getSessionRequired.rejected]: (state, action) => {
			state.error = action.payload;
		},

		//getSessionJudgement
		[getSessionJudgement.pending]: (state, action) => {
			state.error = null;
		},
		[getSessionJudgement.fulfilled]: (state, action) => {
			// console.log("action.payload", action.payload);
			state.theSessionJudgment = action.payload;
			state.error = null;
		},
		[getSessionJudgement.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export default constantSessionSlice.reducer;
