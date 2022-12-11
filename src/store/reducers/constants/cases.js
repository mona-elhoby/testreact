import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { api_url, axiosConfig } from '../../config';


//case type
export const getCasesType = createAsyncThunk('constraint/getCasesType', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-type?total=true&FIL_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case type
export const setCasesType = createAsyncThunk('constraint/setCasesType', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case category
export const getCasescategory = createAsyncThunk('constraint/getCasescategory', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-category?total=true&FIL_CATEGORY_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case category
export const setCasescategory = createAsyncThunk('constraint/setCasescategory', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-category`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case category
export const getCasescloseType = createAsyncThunk('constraint/getCasesclose-type', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-close-type?total=true&FIL_CLOSE_TYPE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case close-type
export const setCasescloseType = createAsyncThunk('constraint/setCasesclose-type', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-close-type`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case category
export const getCasesMediator = createAsyncThunk('constraint/getCasesMediator', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-mediator?total=true&FIL_MEDITOR_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case close-type
export const setCasesMediator = createAsyncThunk('constraint/setCasesMediator', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-mediator`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case category
export const getCasesStatus = createAsyncThunk('constraint/getCasesStatus', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-status?total=true&FIL_STATUS_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case close-type
export const setCasesStatus = createAsyncThunk('constraint/setCasesStatus', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-status`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case category
export const getCasesSource = createAsyncThunk('constraint/getCasesSource', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-source?total=true&FIL_SOURCE_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case close-type
export const setCasesSource = createAsyncThunk('constraint/setCasesSource', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-source`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case category
export const getCasesSubject = createAsyncThunk('constraint/getCasesSubject', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/case-subject?total=true&FIL_SUBJECT_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case close-type
export const setCasesSubject = createAsyncThunk('constraint/setCasesSubject', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/case-subject`, data, {
		headers: axiosConfig,
	});

	return res;
});

//case getCasesCompanyOffice
export const getCasesCompanyOffice = createAsyncThunk('constraint/getCasesCompanyOffice', async (_, thunkAPI) => {
	const res = await axios.get(`${api_url}/constraint/company-office?total=true&OFC_NAME_STATUS=true`, {
		headers: axiosConfig,
	});
	return res.data.data;
});

//case setCasesCompanyOffice
export const setCasesCompanyOffice = createAsyncThunk('constraint/setCasesCompanyOffice', async (data, thunkAPI) => {
	const res = await axios.post(`${api_url}/constraint/company-office`, data, {
		headers: axiosConfig,
	});

	return res;
});

const CasesConstants = createSlice({
	name: 'constraint',
	initialState: {
		theCasesTypeCompo: [],
		theCasesCloseTypeCompo: [],
		theCasesCategoryCompo: [],
		theCasesMediatorCompo: [],
		theCasesStatusCompo: [],
		theCasesSourceCompo: [],
		theCasesSubjectCompo: [],
		theCasesCompanyOfficeCompo: [],
		error: [],
	},
	extraReducers: {
		[getCasesType.fulfilled]: (state, action) => {
			state.theCasesTypeCompo = action.payload;
			state.error = null;
		},
		[getCasescategory.fulfilled]: (state, action) => {
			state.theCasesCategoryCompo = action.payload;
			state.error = null;
		},
		[getCasescloseType.fulfilled]: (state, action) => {
			state.theCasesCloseTypeCompo = action.payload;
			state.error = null;
		},
		[getCasesMediator.fulfilled]: (state, action) => {
			state.theCasesMediatorCompo = action.payload;
			state.error = null;
		},
		[getCasesStatus.fulfilled]: (state, action) => {
			state.theCasesStatusCompo = action.payload;
			state.error = null;
		},
		[getCasesSource.fulfilled]: (state, action) => {
			state.theCasesSourceCompo = action.payload;
			state.error = null;
		},
		[getCasesSubject.fulfilled]: (state, action) => {
			state.theCasesSubjectCompo = action.payload;
			state.error = null;
		},
		[getCasesCompanyOffice.fulfilled]: (state, action) => {
			state.theCasesCompanyOfficeCompo = action.payload;
			state.error = null;
		},
	},
});

export default CasesConstants.reducer;
