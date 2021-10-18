import { useEffect, useRef, useState } from "react";
import { UpdateData, AddData } from "../../Apis/SaveData";
import FetchData from "../../Apis/FetchData";
import { Casa } from "../../Models/Models"
import "./Modal.css"
import { useDispatch, useSelector } from "react-redux";
import { setRow } from "../../Redux/Slices/rowSlice";
import { RootState } from "../../Redux/store";
interface Modal {
    submitFunction: string,
    filter: any,
    tableName: string,
    updateList: any,
    viewModal: any
}
const Modal = ({ submitFunction, filter, tableName, updateList, viewModal }: Modal) => {
    const ref = useRef<any>()
    const dispatch = useDispatch();
    const [casaList, setCasaList] = useState<Casa[]>([]);
    const [propertyHasErrors, setPropertyHasErrors] = useState<any>({})
    const [isModalClosed, setIsModalClosed] = useState(false)
    const regex = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    const row = useSelector((state: RootState) => state.setRow).value.payload
    const handleInputChange = (e: any) => {
        const evValue = e.currentTarget.value;
        const evName = e.currentTarget.name;
        const keys = Object.keys(row);
        keys.map((key) => (setPropertyHasErrors((l: {}) => ({ ...l, [evName]: false })), dispatch(setRow({ ...row, [evName]: evValue }))))

    }
    useEffect(() => {
        Object.keys(row).map((property) => setPropertyHasErrors((l: {}) => ({ ...l, [property]: false })))
        FetchData("casa")
            .then((data) => setCasaList(data))
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    }, [])

    const handleSubmit = (event: any) => {
        { submitFunction === "update" && UpdateData(tableName, row).finally(() => updateList(tableName)) };
        { submitFunction === "add" && AddData(tableName, row).finally(() => updateList(tableName)) }
        closeModal()
        event.preventDefault()
    }
    const closeModal = () => {
        setIsModalClosed(true)
        setTimeout(() => {
            viewModal(false)
        }, 700)
    }
    const handleErrors =() => {


        Object.keys(row).map((property) => { !row[property] ? setPropertyHasErrors((l: {}) => ({ ...l, [property]: true })) : setPropertyHasErrors((l: {}) => ({ ...l, [property]: false })) })
        if (tableName === "animale") {

            { isNaN(row.nzampe) && dispatch(setRow({ ...row, nzampe: "" })) };
            { isNaN(row.nzampe) && setPropertyHasErrors((l:{})=>({ ...l, nzampe: true })) };

        }
        if (tableName === "casa") { 
            {isNaN(row.nlocali) ||  row.nlocali === "0" && dispatch(setRow({ ...row, nlocali: "" })) }
            {isNaN(row.nlocali) ||  row.nlocali === "0" && setPropertyHasErrors((l:{})=>({ ...l, nlocali: true })) };
        }
        if (tableName === "persona"){
            {!regex.test(row.dataNascita) && dispatch(setRow({ ...row, dataNascita: "" })) }
            {!regex.test(row.dataNascita) && setPropertyHasErrors((l:{})=>({ ...l, dataNascita: true })) }
        }
    }
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className={!isModalClosed ? "modal-container fade-in" : "modal-container fade-out"}>

                <div className={!isModalClosed ? "selected-row modal top-to-bottom" : "selected-row modal bottom-to-top"} ref={ref}>
                    <img className="close-button" src="img/close.png" alt="X" onClick={() => closeModal()} />
                    {filter(row).map((property: any, index: number) => (<div className="input-flex"><label>{property}</label><input required type="text" autoComplete="off" className={propertyHasErrors[property] && "input-error"} name={property} key={index} value={row[property]} onChange={(event) => { handleInputChange(event) }} /></div>))}
                    <div>
                        {tableName !== "casa" &&
                            <select name="idCasa" onChange={(event) => handleInputChange(event)}>
                                {tableName === "animale" && <option value="" selected={!row.idCasa && true}>NULL</option>}
                                {casaList.map((casa, index) => <option key={index} value={casa.id} selected={row.idCasa === casa.id && true}>{casa.via}</option>)}
                            </select>
                        }
                    </div>
                    <div><button className="table-button" type="submit" onClick={() => handleErrors()} >{submitFunction === "update" && "UPDATE"}{submitFunction === "add" && "ADD"}</button></div>

                </div>

            </div>
        </form>
    )
}

export default Modal;