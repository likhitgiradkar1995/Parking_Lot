import logo from './logo.svg';
import './App.css';
import Parking_Main from './Component/Parking_Main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './Component/HomePage';


function App() {
  return (
    <div className="App">
      {/* <Router>
        <div>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/Parking_Main' component={Parking_Main}/>
          </Switch>
        </div>
      </Router> */}
      <Parking_Main />
    </div>
  );
}

export default App;
