import { useEffect, useRef, useState } from "react";
import { UpdateData, AddData } from "../../Apis/SaveData";
import FetchData from "../../Apis/FetchData";
import { Casa } from "../../Models/Models"
import "./Modal.css"
import { useDispatch, useSelector } from "react-redux";
import { setRow } from "../../Redux/Slices/rowSlice";
import { RootState } from "../../Redux/store";
interface Modal {
    selectedRowList: any,
    submitFunction: string,
    handleChange: any,
    filter: any,
    tableName: string,
    updateList: any,
    viewModal: any
}
const Modal = ({ selectedRowList, submitFunction, handleChange, filter, tableName, updateList, viewModal }: Modal) => {
    const ref = useRef<any>()
    const dispatch = useDispatch();
    const [casaList, setCasaList] = useState<Casa[]>([]);
    const [json, setJson] = useState<any>({})
    const [isModalClosed, setIsModalClosed] = useState(false)
    const row = useSelector((state: RootState) => state.setRow).value.payload
    const handleInputChange = (e: any, l: {}) => {
        const evValue = e.currentTarget.value;
        const evName = e.currentTarget.name;
        const keys = Object.keys(l);
        keys.map((key) => (dispatch(setRow({ ...row, [evName]: evValue })), setJson({ ...json, [evName]: evValue }), handleChange({ ...selectedRowList, [evName]: { value: evValue, hasErrors: false } })))

    }
    useEffect(() => {
        Object.keys(selectedRowList).map((input) => {
            setJson((json: {}) => ({ ...json, [input]: selectedRowList[input].value }))
        })
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


    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className={!isModalClosed ? "modal-container fade-in" : "modal-container fade-out"}>

                <div className={!isModalClosed ? "selected-row modal top-to-bottom" : "selected-row modal bottom-to-top"} ref={ref}>
                    <img className="close-button" src="img/close.png" alt="X" onClick={() => closeModal()} />
                    {filter(row).map((property: any, index: number) => (<div className="input-flex"><label>{property}</label><input required type="text" autoComplete="off" name={property} key={index} value={row[property]} onChange={(event) => { handleInputChange(event, row) }} /></div>))}
                    <div>
                        {tableName !== "casa" &&
                            <select name="idCasa" onChange={(event) => handleInputChange(event, selectedRowList)}>
                                {tableName === "animale" && <option value="" selected={!row.idCasa && true}>NULL</option>}
                                {casaList.map((casa, index) => <option key={index} value={casa.id} selected={row.idCasa === casa.id && true}>{casa.via}</option>)}
                            </select>
                        }
                    </div>
                    <div><button className="table-button" type="submit" >{submitFunction === "update" && "UPDATE"}{submitFunction === "add" && "ADD"}</button></div>

                </div>

            </div>
        </form>
    )
}

export default Modal;