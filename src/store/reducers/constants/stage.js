import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, axiosConfig } from '../../config';


//stageJudge
export const getStageJudge = createAsyncThunk('constraint/getStageJudge', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/stage-judge?total=true&STG_JUDGE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//stageJudge
export const setStageJudge = createAsyncThunk('constraint/setStageJudge', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/stage-judge`, data, {
		headers: axiosConfig,
	});

	return res;
});

//stage kind
export const getStageKind = createAsyncThunk('constraint/getStageKind', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/stage-kind?total=true&STG_KIND_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//stage kind
export const setStageKind = createAsyncThunk('constraint/setStageKind', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/stage-kind`, data, {
		headers: axiosConfig,
	});

	return res;
});

//stage office
export const getStageOffice = createAsyncThunk('constraint/getStageclose-type', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/stage-office?total=true&OFC_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//stage office
export const setStageOffice = createAsyncThunk('constraint/setStageclose-type', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/stage-office`, data, {
		headers: axiosConfig,
	});

	return res;
});

//getStageResult
export const getStageResult = createAsyncThunk('constraint/getStageResult', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/stage-result?total=true&STG_RESUlT_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//getStageResult
export const setStageResult = createAsyncThunk('constraint/setStageResult', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/stage-result`, data, {
		headers: axiosConfig,
	});

	return res;
});

//getStageStatus
export const getStageStatus = createAsyncThunk('constraint/getStageStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/stage-status?total=true&STG_STATUS_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//getStageStatus
export const setStageStatus = createAsyncThunk('constraint/setStageStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/stage-status`, data, {
		headers: axiosConfig,
	});

	return res;
});

//getStageType
export const getStageType = createAsyncThunk('constraint/getStageType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/stage-type?total=true&STG_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//getStageType
export const setStageType = createAsyncThunk('constraint/setStageType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/stage-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

const StageConstants = createSlice({
	name: 'constraint',
	initialState: {
		theStageJudgeCompo: [],
		theStageOfficeCompo: [],
		theStageKindCompo: [],
		theStageResultCompo: [],
		theStageStatusCompo: [],
		theStageTypeCompo: [],
		error: [],
	},
	extraReducers: {
		[getStageJudge.fulfilled]: (state, action) => {
			state.theStageJudgeCompo = action.payload;
			state.error = null;
		},
		[getStageKind.fulfilled]: (state, action) => {
			state.theStageKindCompo = action.payload;
			state.error = null;
		},
		[getStageOffice.fulfilled]: (state, action) => {
			state.theStageOfficeCompo = action.payload;
			state.error = null;
		},
		[getStageResult.fulfilled]: (state, action) => {
			state.theStageResultCompo = action.payload;
			state.error = null;
		},
		[getStageStatus.fulfilled]: (state, action) => {
			state.theStageStatusCompo = action.payload;
			state.error = null;
		},
		[getStageType.fulfilled]: (state, action) => {
			state.theStageTypeCompo = action.payload;
			state.error = null;
		},
	},
});

export default StageConstants.reducer;
