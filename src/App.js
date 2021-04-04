
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {useState} from 'react';

import { Homepage } from './Pages/homepage';
import { Analysis } from './Pages/analysis';
import {PasswordGenerator} from './Pages/password_generator'
import {Test} from './Pages/test';

function App() {
  const [graph, setGraph] = useState({})
  const [data_reached,setData_Reached]= useState(false)

  const render_analysis_page = (graph_data) =>{
    if(data_reached){
      return <Analysis graph={graph_data}/>
    }else{
      return <Redirect to="/"/>
    }
  }

  // Routes for pages
  return (
    <div>
     <Router>
        <Switch>
          <Route exact path='/'>
            {/* Home Page */}
            <Homepage onGraphChange={setGraph} onDataReached={setData_Reached}/>
          </Route>
          <Route path="/analysis">
            {/* Analysis Page */}
            {render_analysis_page(graph)}
          </Route>
          <Route path="/test">
            {/* Test Page */}
            <Test/>
          </Route>
          <Route exact path="/tools">
            {/* Test Page */}
            <PasswordGenerator/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
