import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import axios from "axios";
import Login from './pages/Login.js';
import AddUser from './pages/AddUser';
import AddLocation from './pages/AddLocation';
import AddRequest from './pages/AddRequest';
import Users from './pages/Users';
import Locations from './pages/Locations';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/add-user" element={ <AddUser /> } />
          <Route path="/add-location" element={ <AddLocation /> } />
          <Route path="/add-request" element={ <AddRequest /> } />
          <Route path="/users" element={ <Users /> } />
          <Route path="/locations" element={ <Locations /> } />
          {/* <Route path="/logout" element={ <Logout /> } /> */}
        </Routes>
      </Router>
  );
}

export default App;
