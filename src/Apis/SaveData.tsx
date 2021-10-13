import Error from "../Components/Error/Error"
export const UpdateData = (tableName:string,body:{})=>{
    const url = "http://localhost:8080/api/" + tableName + "/update"
    return(
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch((error) => {
                <Error error={error} />
                console.log(error);
            }) )
            
}

export const AddData = (tableName:string,body:any)=>{
    const url = "http://localhost:8080/api/" + tableName + "/add"
    return(
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch((error) => {
               console.log(error)
            }) )
            
}
