import logo from './logo.svg';
import './App.css';
import { useState, createContext, useMemo, useEffect, } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import axios from "axios";
import Login from './pages/Login.js';
import { API_URL, } from "./utils/constants.js"
import AddUser from './pages/AddUser';
import AddLocation from './pages/AddLocation';
import AddRequest from './pages/AddRequest';
import Users from './pages/Users';
import Locations from './pages/Locations';
import Requests from './pages/Requests';
import ViewStock from './pages/ViewStock';
import axios from "axios";

export const UserContext = createContext({
  user: {
    name: '',
    email: '',
    role: -1,
    phone: '',
    location: '',
    blocked: false
  },
  updateUser: () => {},
});

function App() {
  const [user, updateUser] = useState({
    name: '',
    location: '',
    email: '',
    role: 1,
    phone: '',
    contactEmail: '',
    isBlocked: false
  });

  const value = useMemo(
    () => ({ user, updateUser }), 
    [user]
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.get(API_URL + "/auth/user_data",
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
          if (res?.data?.error) {
              console.log(res?.data?.error);
          } else {
            console.log(res)
              updateUser(res.data);
          }
      })
      .catch(err => console.log(err))
    }
  }, [])

  return (
      <Router>
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/add-user" element={ <AddUser /> } />
          <Route path="/add-location" element={ <AddLocation /> } />
          <Route path="/add-request" element={ <AddRequest /> } />
          <Route path="/users" element={ <Users /> } />
          <Route path="/locations" element={ <Locations /> } />
          <Route path="/requests" element={ <Requests /> } />
          <Route path="/view-stock" element={ <ViewStock /> } />
          {/* <Route path="/logout" element={ <Logout /> } /> */}
        </Routes>
      </Router>
  );
}

export default App;
