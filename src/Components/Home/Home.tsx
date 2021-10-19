import Card from "../Card/Card";

const Home = ()=>{
    return(
        <div className="cards-container">
            <Card image="img/dog.png" cardClass="dog" title="Animale"  />
            <Card image="img/casa.jpg" cardClass="casa" title="Casa" />
            <Card image="img/person.png" cardClass="persona" title="Persona"  />
        </div>
    )
}
export default Home;