import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: { 
    userData: {},
    isLoggedIn: false

  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
      // console.log('this is in payload', action.payload)
      // console.log('this is in slice', state.userData)
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload   
    }
  }

})

export const {  setUserData, setIsLoggedIn } = auth.actions
export default auth.reducer