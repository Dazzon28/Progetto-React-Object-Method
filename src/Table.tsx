import { useEffect, useState } from "react";

interface Props {
    name: string,
}


const Table = ({ name }: Props) => {
    const [list, setList] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect( () => {
        setLoading(true)
        fetch("http://localhost:8080/api/"+name.toString()+"/all",{
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => setList(data))
        .catch((error) => {
            console.log(error);
        })
        .finally(()=>setLoading(false))
    },[])
    return (
        
        <div className="table-container">
            {loading && <div>loading</div>}
            {!loading && list.map( (elem,index)=>{
                return(
                    <div key={index}>{elem.id}</div>
  
            )})}
        </div>
    )
    
}

export default Table;