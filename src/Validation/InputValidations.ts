import { useDispatch, useSelector } from "react-redux"
import { setRow } from "../Redux/Slices/rowSlice";
import { RootState } from "../Redux/store"


const InputValidation = (tableName:string)=>{
    const row = useSelector((state:RootState)=>state.setRow).value.payload
    const dispatch = useDispatch();
    const regex = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    Object.keys(row).map((property) => { !row[property] ? dispatch(setPropertyHasErrors((l: {}) => ({ ...l, [property]: true }))) : dispatch(setPropertyHasErrors((l: {}) => ({ ...l, [property]: false }))) })
        if (tableName === "animale") {

            { isNaN(row.nzampe) && dispatch(setRow({ ...row, nzampe: "" })) };
            { isNaN(row.nzampe) && dispatch(setPropertyHasErrors((l:{})=>({ ...l, nzampe: true }))) };

        }
        if (tableName === "casa") { 
            {isNaN(row.nlocali) ||  row.nlocali === "0" && dispatch(setRow({ ...row, nlocali: "" })) }
            {isNaN(row.nlocali) ||  row.nlocali === "0" && dispatch(setPropertyHasErrors((l:{})=>({ ...l, nlocali: true }))) };
        }
        if (tableName === "persona"){
            {!regex.test(row.dataNascita) && dispatch(setRow({ ...row, dataNascita: "" })) }
            {!regex.test(row.dataNascita) && setPropertyHasErrors((l:{})=>({ ...l, dataNascita: true })) }
        }
}

export default InputValidation;

function setPropertyHasErrors(arg0: (l: {}) => {}): any {
    throw new Error("Function not implemented.");
}
