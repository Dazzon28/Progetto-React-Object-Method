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
    const [input,setInput]= useState<any>({});
    const [shown,setShown] = useState(false);
    const fetchData = ()=>{
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
    const handleChange = (e:any,l:any[])=>{
        setInput({...input,id:list[i].id,[e.target.name]:e.target.value})
        console.log(input)
    }
    const handleClick = (i:any)=>{
        console.log(JSON.stringify(input))
        setLoading(true)
        setShown(false)
        fetch("http://localhost:8080/api/" + name.toString() + "/update", {
            method: 'PUT',
            body:JSON.stringify(input),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
            .finally(() => (fetchData(),setLoading(false)))
        
    }
    const filterList = (list:any[])=>Object.keys(list).filter((property)=>property!=="id" && property!=="idCasa")
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
                {i !== null && <> 
                
                {filterList(list[i]).map((att:any,index)=><input type="text" name={att} key={index} value={input[att]} onChange={(e)=>{handleChange(e,list[i])}} />)}
                    <button className="table-button" onClick={()=>handleClick(list[i].id)}>UPDATE</button></>
                }
                <button className="table-button" onClick={()=>setShown(false)} >CANCEL</button>

            </div>
        </div>
    )

}

export default Table;