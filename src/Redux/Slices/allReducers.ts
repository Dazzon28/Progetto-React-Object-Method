import { combineReducers } from "redux";
import listReducer from "./ListSlice"
import rowReducer from "./rowSlice"

const allReducers = combineReducers({
    setList:listReducer,
    setRow:rowReducer,
})

export default allReducers