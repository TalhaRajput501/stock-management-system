import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: { 
    userData: {},
    
  },
  reducers: {
    setUserData: (state, action) => {
      // console.log('this is from slice', action.payload)
      state.userData = action.payload
    }
  }

})

export const {  setUserData } = auth.actions
export default auth.reducer