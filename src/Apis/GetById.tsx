const GetById = (id:number,tableName:string)=>{
    return(
        fetch("http://localhost:8080/api/"+tableName+"/id-casa/" + id, {
            method: 'GET',
        })
            .then(response => response.json())
    )
}

export default GetById;