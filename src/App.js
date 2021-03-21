
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {useState, useEffect} from 'react';

import { Homepage } from './Pages/homepage';
import { Analysis } from './Pages/analysis'

function App() {
  const [graph, setGraph] = useState({})

  const handleGraphChange = (inputValue) =>{
    setGraph(inputValue)
    console.log(graph)
}


  // Routes for pages
  return (
    <div>
     <Router>
        <Switch>
          <Route exact path='/'>
            {/* Home Page */}
            <Homepage onGraphChange={handleGraphChange}/>
          </Route>
          <Route path="/analysis">
            {/* Analysis Page */}
            <Analysis graph={graph}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
