import { createSlice } from "@reduxjs/toolkit";
export interface ErrorState{
    value:any
}
const initialState:ErrorState = {
    value:{}
}

export const ErrorSlice = createSlice({
    name:"error",
    initialState,
    reducers:{
        setError:(state,data)=>{state.value=data}
    }
})

export const {setError} =ErrorSlice.actions
export default ErrorSlice.reducer