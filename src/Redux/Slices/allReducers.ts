import { combineReducers } from "redux";
import listReducer from "./ListSlice"
import rowReducer from "./rowSlice"
import errorReducer from "./ErrorSlice"
import propertyHasErrorsReducer from "./propertyErrorSlice"
import { fetchAllData } from "../Services/fetchAllData";
const allReducers = combineReducers({
    setList:listReducer,
    setRow:rowReducer,
    setError:errorReducer,
    setPropertyHasErrors:propertyHasErrorsReducer,
    [fetchAllData.reducerPath]:fetchAllData.reducer
})

export default allReducers