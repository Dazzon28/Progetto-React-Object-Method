import { useEffect, useState } from "react";
import "./table.css"
import FetchData from "../../Apis/FetchData"
import GetById from "../../Apis/GetById";
import { Animale, Persona, Casa } from "../../Models/Models"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import Modal from "../Modal/Modal";
import Error from "../Error/Error";
interface Props {
    name: string,
    onClick: any;
}


const Table = ({ name, onClick }: Props) => {
    const [view, setView] = useState("table")
    const [list, setList] = useState<any[]>([]);
    const [animaleList, setAnimaleList] = useState<Animale[]>([]);
    const [personaList, setPersonaList] = useState<Persona[]>([]);
    const [casaList, setCasaList] = useState<Casa[]>([]);
    const [loading, setLoading] = useState(true);
    const [rowId, setRowId] = useState<any>(null);
    const [selectedRow, setSelectedRow] = useState<any>({});
    const [submitFunction,setSubmitFunction] = useState("");
    const [viewModal,setViewModal] = useState(true)

    const fetchData = () => {

        FetchData(name)
            .then(data => setList(data))
            .catch((error) => {
                <Error error={error} />
                console.log(error);
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        setLoading(true)
        getCasaList();
        fetchData();
    }, [])

    const handleRow = (l: {},methodName:string) => {
        const keys = Object.keys(l);
        const values = Object.values(l);
        {methodName === "update" && keys.map((key, i) => setSelectedRow((selectedRow: {}) => ({ ...selectedRow, [key]: {value:values[i],hasErrors:false} })))}
        {methodName === "add" && keys.map((key, i) => setSelectedRow((selectedRow: {}) => ({ ...selectedRow, [key]: {value:"",hasErrors:false} })))}
        {methodName === "add" && name === "persona" && keys.map((key, i) => setSelectedRow((selectedRow: {}) => ({ ...selectedRow, [key]: "" ,idCasa:1})))}
    }
    const getCasaList = () => {
        FetchData("casa")
            .then(data => setCasaList(data))
            .catch((error) => {
                console.log(error);
            })

    }
    const viewCasa = (id: number) => {
            GetById(id,"animale")
            .then(data => setAnimaleList(data))
            .catch((error) => {
                <Error error={error} />
                console.log(error);
            })
            .finally(() => setLoading(false))
            GetById(id,"persona")
            .then(data => setPersonaList(data))
            .catch((error) => {
                <Error error={error} />
                console.log(error);
            })
            .finally(() => setLoading(false))
        setView("casa")
    }
  
    
    const filterList = (list: any[]) => Object.keys(list).filter((property) => property !== "id" && property !== "idCasa")
    return (
        <div>
            {view === "table" && <div className="table-container">
                {loading ? <LoadingSpinner /> : <table><thead>
                    <tr>{filterList(list[0]).map((att: any, id) => <th key={id}>{att.toUpperCase()}</th>)}
                        {name === "casa" && <th>VIEW</th>}<th>EDIT</th></tr>
                </thead>
                    <tbody>
                        {list.map((elem, id) => <tr key={id}>
                            {filterList(elem).map((att: any, index) => <td key={index}>{elem[att] ? elem[att] : 0}</td>)
                            }{name === "casa" && <td><button className="table-button" onClick={() => viewCasa(list[id].id)}>VIEW</button></td>}
                            <td><button className="table-button" onClick={() => {
                                setRowId(id);
                                handleRow(list[id],"update");
                                setSubmitFunction("update");
                                setViewModal(true)

                            }}>EDIT</button></td>
                        </tr>)}
                    </tbody>
                </table>}
                <button className="table-button" onClick={() => (setViewModal(true),setSubmitFunction("add"),handleRow(list[0],"add"))}>ADD</button>
                <button className="table-button" onClick={onClick}>GO BACK</button>
                {viewModal && <>{submitFunction && <Modal selectedRowList={selectedRow} submitFunction={submitFunction} handleChange={setSelectedRow} filter={filterList} tableName={name} updateList={fetchData} viewModal={setViewModal}/>}</>}
                
                
            </div>}
            {view === "casa" &&
                <div className="table-container">
                    <table>
                        <thead>
                            <th>NOME</th>
                        </thead>
                        <tbody>
                            {animaleList.map((elem, index) => <tr><td>{elem.nome}</td></tr>)}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <th>NOME</th> <th>COGNOME</th>
                        </thead>
                        <tbody>
                            {personaList.map((elem, index) => <tr><td>{elem.nome}</td><td>{elem.cognome}</td></tr>)}
                        </tbody>
                    </table>
                    <button className="table-button" onClick={() => setView("table")}>GO BACK</button>
                </div>

            }
        </div>

    )
}
export default Table;