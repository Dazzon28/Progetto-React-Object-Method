import { createSlice } from "@reduxjs/toolkit";
export interface ListState{
    value:any
}
const initialState:ListState = {
    value:{}
}

export const ListSlice = createSlice({
    name:"list",
    initialState,
    reducers:{
        listSet:(state,data)=>{state.value=data}
    }
})

export const {listSet} =ListSlice.actions
export default ListSlice.reducer