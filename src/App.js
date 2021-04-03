
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {useState} from 'react';

import { Homepage } from './Pages/homepage';
import { Analysis } from './Pages/analysis';
import {Test} from './Pages/test';

function App() {
  const [graph, setGraph] = useState({})


  // Routes for pages
  return (
    <div>
     <Router>
        <Switch>
          <Route exact path='/'>
            {/* Home Page */}
            <Homepage onGraphChange={setGraph}/>
          </Route>
          <Route path="/analysis">
            {/* Analysis Page */}
            <Analysis graph={graph}/>
          </Route>
          <Route path="/test">
            {/* Analysis Page */}
            <Test/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
