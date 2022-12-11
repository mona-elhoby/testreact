import { createSlice } from '@reduxjs/toolkit'


export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {sidebarShow: true},
  reducers: {
    set: (state) => {
        return  {sidebarShow: !state.sidebarShow}
    },
  },
})

export const { set } = sidebarSlice.actions

export default sidebarSlice.reducer
