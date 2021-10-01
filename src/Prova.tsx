interface Props{
    arr:string[]
}
const Prova = ({arr}:Props)=>{
    const fetchData=()=>{
        const data = fetch("http://localhost:8080/api/casa/all").then((res)=>{console.log(res.json())});
        return data
    }
    fetchData();
    return(
        <div className="App">
            
        </div>
    )
}

export default Prova;