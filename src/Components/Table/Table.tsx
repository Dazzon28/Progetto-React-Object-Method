import { useEffect, useState } from "react";
import "./table.css";
import FetchData from "../../Apis/FetchData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { listSet } from "../../Redux/Slices/ListSlice";
import { setRow } from "../../Redux/Slices/rowSlice";
import Error from "../../Components/Error/Error"
import { setError } from "../../Redux/Slices/ErrorSlice";
interface Props {
    name: string,
}


const Table = ({ name }: Props) => {
    const list = useSelector((state: RootState) => state.setList)
    const [loading, setLoading] = useState(true);
    const [fetchHasError,setFetchHasError] = useState(false);
    const [submitFunction, setSubmitFunction] = useState("");
    const [viewModal, setViewModal] = useState(true)
    const dispatch = useDispatch()


    const fetchData = () => {

        FetchData(name)
            .then(data => dispatch(listSet(data)))
            .catch((error) => {
                setFetchHasError(true);
                dispatch(setError(error))
                console.log("error");
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleRow = (l: {}, methodName: string) => {
        const keys = Object.keys(l);
        const values = Object.values(l);
        { methodName === "update" && keys.map((key, i) => (dispatch(setRow(l)))) }
        { methodName === "add" && keys.map((key, i) => (l = { ...l, [key]: "" }, dispatch(setRow(l)))) }
        { methodName === "add" && name === "persona" && keys.map((key, i) => (l = { ...l, [key]: "", idCasa: 1 }, dispatch(setRow(l)))) }

    }
    const filterList = (list: any) => Object.keys(list).filter((property) => property !== "id" && property !== "idCasa")
    return (
        <div className="table-container">
            {loading ? <LoadingSpinner /> : fetchHasError ? <Error />:
            <>
            <table><thead>
                <tr>{filterList(list.value.payload[0]).map((att: string, id) => <th key={id}>{att.toUpperCase()}</th>)}
                    {name === "casa" && <th>VIEW</th>}<th>EDIT</th></tr>
            </thead>
                <tbody>
                    {list.value.payload.map((elem: string, id: number) => <tr key={id}>
                        {filterList(elem).map((att: any, index) => <td key={index}>{elem[att] ? elem[att] : 0}</td>)
                        }{name === "casa" && <td>
                            <Link to={"/Casa/componenti-casa/" + list.value.payload[id].id} className="table-button">VIEW</Link>
                        </td>}
                        <td><button className="table-button" onClick={() => {
                            handleRow(list.value.payload[id], "update");
                            setSubmitFunction("update");
                            setViewModal(true)
                        }}>EDIT</button></td>
                    </tr>)}
                </tbody>
            </table>
            <button className="table-button" onClick={() => (setViewModal(true), dispatch(setRow(list.value.payload[0])), setSubmitFunction("add"), handleRow(list.value.payload[0], "add"))}>ADD</button>
            </>
           
            }
            
            <Link to="/home" className="table-button">GO BACK</Link>
            {viewModal && <>{submitFunction && <Modal submitFunction={submitFunction} filter={filterList} tableName={name} updateList={fetchData} viewModal={setViewModal} />}</>}


        </div>



    )
}
export default Table;