
import './App.css';
import './Components/Card/cards.css';
import Card from "./Components/Card/Card";
import Table from './Components/Table/Table';
import CasaView from './Components/Table/CasaView/CasaView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const App = () => {
  return (
    
    <Router>

      <Switch>
        <Route path="/(|Home)">
          <div className="cards-container">
            <Card image="img/dog.png" cardClass="dog" title="Animale"  />
            <Card image="img/casa.jpg" cardClass="casa" title="Casa" />
            <Card image="img/person.png" cardClass="persona" title="Persona"  />
          </div>
        </Route>
        <Route path="/Animale">
          <Table name="animale"  />
        </Route>
        <Route exact path="/casa/componenti-casa/:id" >
            <CasaView />
          </Route>
        <Route path="/casa">
          <Table name="casa"  />
        </Route>
        <Route path="/persona">
          <Table name="persona"  />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
