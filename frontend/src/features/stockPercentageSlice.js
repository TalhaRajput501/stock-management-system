import { createSlice } from "@reduxjs/toolkit";


const percentage = createSlice({
  name : 'percentage', 
  initialState: {inStock: 0, outOfStock: 0}, 
  reducers: {
    setPercentage : (state, action) => {
      state.inStock = action.payload.inStock
      state.outOfStock = action.payload.outOfStock
    }
  }
})

export const { setPercentage } = percentage.actions
export default percentage.reducer
