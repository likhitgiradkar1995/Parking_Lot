import logo from './logo.svg';
import './App.css';
import Parking_Main from './Component/Parking_Main';
import Filter_Demo from './Component/Filter_Demo';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
import ParkingInputs from './Component/ParkingInputs';
import Parking_Main1 from './Component/Parking_Main1';


function App() {
  return (
    <div className="App">
      {/* <Router>
        <div>
          <Switch>
            <Route path='/' exact component={ParkingInputs} />
            <Route path='/parkingMain1' component={Parking_Main1} />
          </Switch>
        </div>
      </Router> */}



      <Parking_Main />
      {/* <Filter_Demo/> */}
    </div>
  );
}

export default App;
