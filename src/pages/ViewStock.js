import { useEffect, useState, } from 'react';
import axios from "axios";
import { API_URL, } from "../utils/constants";
import { useParams, } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Header from '../components/Header';
import Stock from '../components/Stock';
import Card from '../components/Card'
import { TextField } from "@material-ui/core";


function createData(name, quantity) {
  return { name, quantity};
}

const rows = [
  createData('Pahare de hartie', 20),
];

function ViewStock() {
  const [user, updateUser] = useState({});
  const [location, updateLocation] = useState({});
  const [requests, updateRequests] = useState([]);
  const [rights, updateRights] = useState(false);
  const { id, } = useParams(); 

  useEffect(() => {
    updateRights(user.role === 1 || (user.role === 2 && user.location?._id === location._id));
  }, [user, location])

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
      })
      .catch(err => console.log(err));

      axios.get(API_URL + "/location/" + id,
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateLocation(res.data);
      })
      .catch(err => console.log(err));

      axios.get(API_URL + "/request?status=2&location=" + id,
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateRequests(res.data);
      })
      .catch(err => console.log(err))
    }
  }, [localStorage.getItem("token")])

  const processRequest = (request, quantity, index) => {
    if (localStorage.getItem("token")) {
      axios.put(API_URL + "/request/resolve/" + request._id, { quantity: quantity, },
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateRequests(requests.map(oldRequest => request._id === oldRequest._id ? { ...oldRequest, status: res.data.resolved.status, } : oldRequest))
        updateLocation({ ...location, stock: res.data.location.stock, });
      })
      .catch(err => console.log(err))
    }
  }

  const updateStock = (name, available) => {
    if (!isNaN(available) && localStorage.getItem("token")) {
      axios.put(API_URL + "/location/stock/" + id, { name: name, available: available, },
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateLocation({ ...location, stock: res.data.stock, });
      })
      .catch(err => console.log(err))
    }
  }

  const addProduct = (name, available) => () => {
    if (localStorage.getItem("token")) {
      const body = {name: name};

      if (!isNaN(available)) {
        body.available = available;
      }

      axios.put(API_URL + "/location/product/" + id, body,
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        console.log(res.data)
        updateLocation({ ...location, stock: res.data.stock, });
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <div className='stock-container'>
        <a className="add-btn" href='/add-location'>+ CREATE REQUEST</a>
        <div className='tables-wrapper'>
          <div className='requests-wrapper'>
            <div className='header'>PENDING REQUESTS</div>
            <div className='body'>
            { requests.map((request, index) => (
              <Card
                key={'req' + index}
                processRequest={ processRequest }
                canResolve={ rights }
                index={ index }
                request={request}/>
            )) }
            </div>
          </div>
          <Stock
            addProduct={ addProduct }
            updateStock={ updateStock }
            rights={ rights }
            stock={ location.stock }/>
        </div>

      </div>
    </div>
  );
}

export default ViewStock;