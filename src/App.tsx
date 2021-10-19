
import './App.css';
import './Components/Card/cards.css';
import Table from './Components/Table/Table';
import CasaView from './Components/Table/CasaView/CasaView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
const App = () => {
  return (
    
    <Router>

      <Switch>
        <Route exact path="/(|Home)">
          <Home />
        </Route>
        <Route exact path="/Animale">
          <Table name="animale"  />
        </Route>
        <Route exact path="/casa/componenti-casa/:id" >
            <CasaView />
          </Route>
        <Route exact path="/casa">
          <Table name="casa"  />
        </Route>
        <Route exact path="/persona">
          <Table name="persona"  />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
