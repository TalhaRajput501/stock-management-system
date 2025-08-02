import { createSlice } from "@reduxjs/toolkit";

const menu = createSlice({
  name: 'menu', 
  initialState : {
    isMenu : false
  }, 
  reducers: {
    setIsMenu : (state) => {
      state.isMenu = !state.isMenu
    }
  }
})

export const {setIsMenu} = menu.actions

export default menu.reducer