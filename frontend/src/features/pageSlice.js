import { createSlice } from "@reduxjs/toolkit";

const page = createSlice({
  name: 'page', 
  initialState: {
    page: 1, 
    limit: 3
  },
  reducers: {
    nextPage: (state) => {
      state.page += 1
    },
    prevPage: (state) => {
      state.page -= 1
    },
  }
})

export const {nextPage, prevPage} = page.actions
export default page.reducer