import { useState } from 'react';
import './App.css';
import './css/cards.css';
import Card from "./Card";
import Table from './Table';
const App = () => {
  const [selector, setSelector] = useState("Home")
  const changeState = (selected: string) => {
    setSelector(selected)
  }
  return (
    <div>
      {selector === "Home" && <div className="cards-container">
        <Card image="img/dog.png" cardClass="dog" title="Animale" onClick={() => { changeState("animale") }} />
        <Card image="img/casa.jpg" cardClass="casa" title="Casa" onClick={() => { changeState("casa") }} />
        <Card image="img/person.png" cardClass="persona" title="Persona" onClick={() => { changeState("persona") }} />
      </div>}
      
      {selector === "animale" && <Table name="animale" />}
      {selector === "casa" && <Table name="casa" />}
      {selector === "persona" && <Table name="persona" />}
    </div>

  );
}

export default App;
