import { createSlice } from "@reduxjs/toolkit";
import { AnyObject } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

export interface PropertyState{
    value:any
}

const initialState:PropertyState = {
    value:{}
}

export const PropertyErrorSlice = createSlice({
    name:"property",
    initialState,
    reducers:{
        setPropertyHasError:(state,data) => {state.value = data}
    }
})

export const setPropertyHasError = PropertyErrorSlice.actions
export default PropertyErrorSlice.reducer