interface Error{
    error: {}
}
const Error = ({error}:Error)=>{
 return(
     <div className = "error-div">
         {error}
     </div>
 )   
}

export default Error;