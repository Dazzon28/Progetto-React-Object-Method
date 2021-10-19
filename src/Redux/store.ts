import { configureStore,applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { fetchAllData } from "./Services/fetchAllData";
import allReducers from "./Slices/allReducers";
const store = configureStore({
    reducer:allReducers,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(fetchAllData.middleware),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store