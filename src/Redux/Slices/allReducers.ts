import { combineReducers } from "redux";
import listReducer from "./ListSlice"
import rowReducer from "./rowSlice"
import errorReducer from "./ErrorSlice"
import propertyHasErrorsReducer from "./propertyErrorSlice"
const allReducers = combineReducers({
    setList:listReducer,
    setRow:rowReducer,
    setError:errorReducer,
    setPropertyHasErrors:propertyHasErrorsReducer,
})

export default allReducers