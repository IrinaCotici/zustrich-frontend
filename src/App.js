import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import axios from "axios";
import Login from './pages/Login.js';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={ <Login /> } />
          {/* <Route path="/logout" element={ <Logout /> } /> */}
        </Routes>
      </Router>
  );
}

export default App;
