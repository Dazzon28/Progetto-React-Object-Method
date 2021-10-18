import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "./error.css";

const Error = ()=>{
    const error = useSelector((state:RootState)=>state.setError).value.payload
    
    return(
        <div className="error-container">
            <p>{error.message}</p>
            <p>{error.stack}</p> 
        </div>
    )
}

export default Error;