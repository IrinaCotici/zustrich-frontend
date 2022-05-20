import { useEffect, useState, } from 'react';
import axios from "axios";
import { API_URL, } from "../../constants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Header from '../components/Header';
import Card from '../components/Card';

function Requests() {
  const [user, updateUser] = useState();
  const [requests, updateRequests] = useState();

  const status = 'closed';
  const productName = 'iaurt cu fructe';
  const quantity = 10;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.get(API_URL + "/auth/user_data",
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateUser(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err));

      axios.get(API_URL + "/request",
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateRequests(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [])

  const obj = {
    status: 'closed',
    productName: 'iaurt cu fructe',
    quantity: 10,
    location: 'Gara de Nord sala 4',
    moderator: 'admin@gmail.com',
    providerName: 'Ghenadie Popa'
  }

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <div className="cards-wrapper">
        <Card props={obj}></Card>
      </div>
    </div>
  );
}

export default Requests;