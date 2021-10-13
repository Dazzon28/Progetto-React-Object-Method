import { Link } from "react-router-dom";

interface Props{
   image:string,
   cardClass:string,
   title:string,
}

const Card = ({image,cardClass,title}:Props)=>{
    return(
        <div className="card">
            <div className="img-container">
                <img src={image} alt="" className={cardClass}/>
            </div>
            <div className="container">
                <h5 className="card-title">{title}</h5>
		        <p className="card-text">Visualizzare il contenuto della tabella {title}.</p>
		       <Link to={"/"+title} className="card-button">VIEW</Link>
            </div>
        </div>
    )
}

export default Card;