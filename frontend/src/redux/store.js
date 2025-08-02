import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/productSlice.js'
import loadingReducer from '../features/loadingSlice.js'
import percentageReducer from '../features/stockPercentageSlice.js'
import dashboardMenuReducer from '../features/dashboardMenuSlice.js'
import authReducer from '../features/authSlice.js'
import pageReducer from '../features/pageSlice.js'
const store = configureStore({
  reducer: {

    product: productReducer,
    loading: loadingReducer, 
    percentage: percentageReducer, 
    menuBar: dashboardMenuReducer,
    auth: authReducer, 
    page: pageReducer
  }
})


export default store