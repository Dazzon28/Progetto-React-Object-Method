interface Props{
   image:string,
   cardClass:string,
   title:string,
   onClick:any
}

const Card = ({image,cardClass,title,onClick}:Props)=>{
    return(
        <div className="card">
            <div className="img-container">
                <img src={image} alt="" className={cardClass}/>
            </div>
            <div className="container">
                <h5 className="card-title">{title}</h5>
		        <p className="card-text">Visualizzare il contenuto della tabella {title}.</p>
		        <button onClick={onClick} className="card-button">VIEW</button>
            </div>
        </div>
    )
}

export default Card;