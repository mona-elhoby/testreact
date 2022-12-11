import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { api_url, token, axiosConfig } from '../config';

export const getReminderCases = createAsyncThunk('reminderData/cases', async (_, thunkAPI) => {
	// console.log(token == `Bearer ${getState().user.accessToken}`)

	const res = await axios.get(`${api_url}/reminder/cases`, {
		headers: axiosConfig,
	});

	//   console.log(result);
	return res.data;
});

// axios.get agency appiontment
export const getReminderAgency = createAsyncThunk('reminderData/agency', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/agency`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get reminder appiontment
export const getReminderAppiontments = createAsyncThunk('reminderData/appiontment', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/appointment`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get client reminder
export const getReminderClients = createAsyncThunk('reminderData/client', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/client`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get contract reminder
export const getReminderContracts = createAsyncThunk('reminderData/contract', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/contract`, {
		headers: axiosConfig,
	});

	//   console.log(result);
	return res.data;
});

// axios.get Dairy reminder
export const getReminderDairy = createAsyncThunk('reminderData/diary', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/diary`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get Employee reminder
export const getReminderEmployee = createAsyncThunk('reminderData/employee', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/employee`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get Execute reminder
export const getReminderExecute = createAsyncThunk('reminderData/execute', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/execute`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get Execute reminder
export const getReminderFollow = createAsyncThunk('reminderData/follow', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/follow`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get reminder Session
export const getReminderSession = createAsyncThunk('reminderData/session', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/session`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get reminder warning
export const getReminderWarning = createAsyncThunk('reminderData/warning', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/warning`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

// axios.get reminder work
export const getReminderWork = createAsyncThunk('reminderData/work', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/reminder/work`, {
		headers: axiosConfig,
	});

	// console.log(result);
	return res.data;
});

export const reminderDataSlice = createSlice({
	name: 'reminderData',
	initialState: {
		reminderCases: null,
		remiderAgency: null,
		remiderAppiontment: null,
		remiderClients: null,
		reminderContracts: null,
		reminderDairy: null,
		reminderEmployee: null,
		reminderExecute: null,
		reminderFollow: null,
		reminderSession: null,
		reminderWork: null,
		reminderWarning: null,
		isLoadingReminder: false,
	},
	extraReducers: {
		[getReminderCases.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderCases.fulfilled]: (state, action) => {
			//   console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderCases = action.payload;
			state.error = null;
		},
		[getReminderCases.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder agency
		[getReminderAgency.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderAgency.fulfilled]: (state, action) => {
			//   console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.remiderAgency = action.payload;
			state.error = null;
		},
		[getReminderAgency.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder Appiontment
		[getReminderAppiontments.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderAppiontments.fulfilled]: (state, action) => {
			//   console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.remiderAppiontment = action.payload;
			state.error = null;
		},
		[getReminderAppiontments.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder clients
		[getReminderClients.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderClients.fulfilled]: (state, action) => {
			//   console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.remiderClients = action.payload;
			state.error = null;
		},
		[getReminderClients.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder contracts
		[getReminderContracts.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderContracts.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderContracts = action.payload;
			state.error = null;
		},
		[getReminderContracts.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder contracts
		[getReminderDairy.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderDairy.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderDairy = action.payload;
			state.error = null;
		},
		[getReminderDairy.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder contracts
		[getReminderEmployee.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderEmployee.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderEmployee = action.payload;
			state.error = null;
		},
		[getReminderEmployee.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder contracts
		[getReminderExecute.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderExecute.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderExecute = action.payload;
			state.error = null;
		},
		[getReminderExecute.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder Follow
		[getReminderFollow.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderFollow.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderFollow = action.payload;
			state.error = null;
		},
		[getReminderFollow.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder session
		[getReminderSession.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderSession.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderSession = action.payload;
			state.error = null;
		},
		[getReminderSession.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder Work
		[getReminderWork.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderWork.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderWork = action.payload;
			state.error = null;
		},
		[getReminderWork.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},

		// get reminder warning
		[getReminderWarning.pending]: (state, action) => {
			state.error = null;
			state.isLoadingReminder = true;
		},
		[getReminderWarning.fulfilled]: (state, action) => {
			// console.log("action.payload;", action.payload);
			state.isLoadingReminder = false;
			state.reminderWarning = action.payload;
			state.error = null;
		},
		[getReminderWarning.rejected]: (state, action) => {
			state.isLoadingReminder = false;
			state.error = action.payload;
		},
	},
});

export default reminderDataSlice.reducer;
