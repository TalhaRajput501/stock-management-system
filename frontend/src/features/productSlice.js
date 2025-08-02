import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products : [], 
  filteredProducts :  [],
}

const productSlice = createSlice({
  name: "product", 
  initialState: initialState, 
  reducers: {
    setProducts : (state, action) => {
      state.products = action.payload
    },
    setFilteredProducts : (state, action) => {
      state.filteredProducts = action.payload
    }
  }
})


export const { setProducts, setFilteredProducts } = productSlice.actions
export default productSlice.reducer
