import { createSlice } from '@reduxjs/toolkit'


export const handleErrors = createSlice({
  name: 'sidebar',
  initialState: {globalErrors: null},
  reducers: {
    setGlobalErrors: (state, action) => { 
        console.log('acton: ', action.payload)
    //    state.globalErrors = 
    },
  },
})

export const { setGlobalErrors } = handleErrors.actions

export default handleErrors.reducer