import { useState } from 'react';
import './App.css';
import './Components/Card/cards.css';
import Card from "./Components/Card/Card";
import Table from './Components/Table/Table';
const App = () => {
  const [selector, setSelector] = useState("Home")
  return (
    <div>
      {selector === "Home" && <div className="cards-container">
        <Card image="img/dog.png" cardClass="dog" title="Animale" onClick={() => { setSelector("animale") }} />
        <Card image="img/casa.jpg" cardClass="casa" title="Casa" onClick={() => { setSelector("casa") }} />
        <Card image="img/person.png" cardClass="persona" title="Persona" onClick={() => { setSelector("persona") }} />
      </div>}
      
      {selector === "animale" && <Table name="animale" onClick={() => { setSelector("Home") }}/>}
      {selector === "casa" && <Table name="casa" onClick={() => { setSelector("Home") }}/>}
      {selector === "persona" && <Table name="persona" onClick={() => { setSelector("Home") }}/>}
    </div>

  );
}

export default App;
