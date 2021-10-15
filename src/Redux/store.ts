import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./Slices/allReducers";
const store = configureStore({
    reducer:allReducers
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store