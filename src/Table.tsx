import { useEffect, useState } from "react";
import "./css/table.css"
interface Props {
    name: string,
    onClick: any;
}


const Table = ({ name, onClick }: Props) => {
    const [view, setView] = useState("table")
    const [list, setList] = useState<any[]>([]);
    const [animaleList, setAnimale] = useState<any[]>([]);
    const [personaList, setPersona] = useState<any[]>([]);
    const [casaList, setCasa] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [i, setI] = useState<any>(null);
    const [input, setInput] = useState<any>({});
    const [shownUpdate, setShown] = useState(false);
    const [shownAdd, setAdd] = useState(false);
    const fetchData = () => {

        fetch("http://localhost:8080/api/" + name.toString() + "/all", {
            method: 'GET',
        })
            .then(response => response.json())
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
    const handleChange = (e: any, l: {}) => {
        const evValue = e.target.value;
        const evName = e.target.name;
        const keys = Object.keys(l);
        keys.map((key) => setInput({ ...input, [evName]: evValue }))


    }

    const handleClick = (i: any) => {
        setLoading(true)
        setShown(false)
        fetch("http://localhost:8080/api/" + name.toString() + "/update", {
            method: 'PUT',
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
            .finally(() => (fetchData(), setLoading(false)))

    }
    const handleRow = (l: {}) => {
        const keys = Object.keys(l);
        const values = Object.values(l);
        keys.map((key, i) => setInput((input: any) => ({ ...input, [key]: values[i] })))

    }
    const getCasa = () => {
        fetch("http://localhost:8080/api/casa/all", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setCasa(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
    }
    const viewCasa = (id: number) => {
        fetch("http://localhost:8080/api/animale/id-casa/" + id, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setAnimale(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
        fetch("http://localhost:8080/api/persona/id-casa/" + id, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setPersona(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
        setView("casa")
    }
    const filterList = (list: any[]) => Object.keys(list).filter((property) => property !== "id" && property !== "idCasa")
    return (
        <div>
            {view === "table" && <div className="table-container">
                {loading ? <div className="loader-div"><img className="img-spinner" src="img/spinner-solid.svg" alt="ciao" /></div> : <table><thead>
                    <tr>{filterList(list[0]).map((att: any, id) => <th key={id}>{att.toUpperCase()}</th>)}
                        {name === "casa" && <th>VIEW</th>}<th>EDIT</th></tr>
                </thead>
                    <tbody>
                        {list.map((elem, id) => <tr key={id}>
                            {filterList(elem).map((att: any, index) => <td key={index}>{elem[att] ? elem[att] : "null"}</td>)
                            }{name === "casa" && <td><button className="table-button" onClick={() => viewCasa(list[id].id)}>VIEW</button></td>}
                            <td><button className="table-button" onClick={() => {
                                setI(id);
                                setShown(true);
                                setAdd(false);
                                handleRow(list[id]);
                                getCasa()
                            }}>EDIT</button></td>
                        </tr>)}
                    </tbody>
                </table>}
                <button className="table-button" onClick={onClick}>GO BACK</button>
                <button className="table-button add" onClick={() => (setAdd(true), setShown(false))}>ADD</button>
                <div className={!shownUpdate ? "hidden" : "selected-row"} >
                    {i !== null && <>

                        {filterList(list[i]).map((att: any, index) => <div className="input-flex"><label htmlFor={att}>{att}</label><input type="text" name={att} key={index} value={input[att]} onChange={(e) => { handleChange(e, list[i]) }} /></div>)}
                        {name !== "casa" &&
                            <select name="idCasa" id="idCasa" onChange={(e) => handleChange(e, list[i])}>
                                {name === "animale" && <option value='' selected={input.idCasa === null && true}>NULL</option>}
                                {casaList.map((elem, index) =>
                                    <option key={index} value={elem.id} selected={input.idCasa === elem.id && true}>{elem.via}</option>
                                )}

                            </select>
                        }
                        <button className="table-button" onClick={() => handleClick(list[i].id)}>UPDATE</button></>
                    }
                    <button className="table-button" onClick={() => setShown(false)} >CANCEL</button>

                </div>
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