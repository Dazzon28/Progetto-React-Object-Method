
const FetchData = (tableName:string)=>{
    return(
        fetch("http://localhost:8080/api/" + tableName + "/all", {
            method: 'GET',
        })
        .then(response => response.json())
    )
}

export default FetchData;