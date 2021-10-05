import { useEffect, useState } from "react";
import "./css/table.css"
interface Props {
    name: string,
    onClick:any;
}


const Table = ({ name, onClick}: Props) => {
    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [i,setI] = useState<any>(null);
    const [row,setRow]= useState<any>({});
    const [shown,setShown] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/" + name.toString() + "/all", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setList(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
    }, [])
    const filterList = (list:any[])=>{
        return Object.keys(list).filter((property)=>property!=="id" && property!=="idCasa")}
   
    return (
        <div className="table-container">
            {loading ? <div>loading</div>: <table><thead>
                <tr>{filterList(list[0]).map((att: any, id) => <th key={id}>{att.toUpperCase()}</th>)}
                {name === "casa" && <th>VIEW</th>}<th>EDIT</th></tr>
            </thead>
                <tbody>
                    {list.map((elem, id) => <tr key={id}>
                        {filterList(elem).map((att: any, index) => <td key={index}>{elem[att]? elem[att] : "null"}</td>)
                        }<td><button className="table-button" onClick={()=>{
                            setI(id);
                            setShown(true);
                        }}>EDIT</button></td>
                    </tr>)}
                </tbody>
            </table>}
            <button className="table-button" onClick={onClick}>GO BACK</button>
            <div className={!shown ? "hidden" :"selected-row"} >
                {i !== null && 
                    filterList(list[i]).map((att:any,index)=>{
                        console.log(list[i])
                    return <input type="text" name={att} key={index} value={list[i][att]} onChange={(e)=>{console.log("a")}} />}
                )
                
            }
                <button className="table-button" onClick={()=>setShown(false)} >CANCEL</button>

            </div>
        </div>
    )

}

export default Table;