import { createSlice } from "@reduxjs/toolkit"

export interface RowType {
    value: any
}

const initialState: RowType = {
    value: {}
}

export const RowSlice = createSlice({
    name:"row",
    initialState,
    reducers:{
        setRow:(state,data)=> {state.value=data},
    }

})

export const {setRow} = RowSlice.actions

export default RowSlice.reducer