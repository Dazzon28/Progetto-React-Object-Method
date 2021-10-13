import { useEffect, useState } from "react";
import "./table.css";
import FetchData from "../../Apis/FetchData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Modal from "../Modal/Modal";
import { Link} from "react-router-dom";
interface Props {
    name: string,
}


const Table = ({ name }: Props) => {
    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState<any>({});
    const [submitFunction, setSubmitFunction] = useState("");
    const [viewModal, setViewModal] = useState(true)

    const fetchData = () => {

        FetchData(name)
            .then(data => setList(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        setLoading(true)
        fetchData();
    }, [])

    const handleRow = (l: {}, methodName: string) => {
        const keys = Object.keys(l);
        const values = Object.values(l);
        { methodName === "update" && keys.map((key, i) => setSelectedRow((selectedRow: {}) => ({ ...selectedRow, [key]: { value: values[i], hasErrors: false } }))) }
        { methodName === "add" && keys.map((key, i) => setSelectedRow((selectedRow: {}) => ({ ...selectedRow, [key]: { value: "", hasErrors: false } }))) }
        { methodName === "add" && name === "persona" && keys.map((key, i) => setSelectedRow((selectedRow: {}) => ({ ...selectedRow, [key]: "", idCasa: 1 }))) }
    }
    const filterList = (list: any[]) => Object.keys(list).filter((property) => property !== "id" && property !== "idCasa")
    return (
        <div className="table-container">
            {loading ? <LoadingSpinner /> : <table><thead>
                <tr>{filterList(list[0]).map((att: any, id) => <th key={id}>{att.toUpperCase()}</th>)}
                    {name === "casa" && <th>VIEW</th>}<th>EDIT</th></tr>
            </thead>
                <tbody>
                    {list.map((elem, id) => <tr key={id}>
                        {filterList(elem).map((att: any, index) => <td key={index}>{elem[att] ? elem[att] : 0}</td>)
                        }{name === "casa" && <td>
                            <Link to={"/Casa/componenti-casa/" + list[id].id} className="table-button">VIEW</Link>
                        </td>}
                        <td><button className="table-button" onClick={() => {
                            handleRow(list[id], "update");
                            setSubmitFunction("update");
                            setViewModal(true)

                        }}>EDIT</button></td>
                    </tr>)}
                </tbody>
            </table>}
            <button className="table-button" onClick={() => (setViewModal(true), setSubmitFunction("add"), handleRow(list[0], "add"))}>ADD</button>
            <Link to="/home" className="table-button">GO BACK</Link>
            {viewModal && <>{submitFunction && <Modal selectedRowList={selectedRow} submitFunction={submitFunction} handleChange={setSelectedRow} filter={filterList} tableName={name} updateList={fetchData} viewModal={setViewModal} />}</>}


        </div>



    )
}
export default Table;