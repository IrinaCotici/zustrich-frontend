import { useEffect, useState, } from 'react';
import axios from "axios";
import { API_URL, } from "../constants";
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
  const [user, updateUser] = useState({});
  const [requests, updateRequests] = useState([]);

  useEffect(() => {
    if ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU0N2Q2ZmYyZjc3YThiZTM3NDZiZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1MzEyNzY2NywiZXhwIjoxNjUzMTQyMDY3fQ.wXYMK3YagVsk0e3YyCxn7vmRjjQqw9yITYuWhpOwpVc') {
      axios.get(API_URL + "/auth/user_data",
          {
            headers: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU0N2Q2ZmYyZjc3YThiZTM3NDZiZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1MzEyNzY2NywiZXhwIjoxNjUzMTQyMDY3fQ.wXYMK3YagVsk0e3YyCxn7vmRjjQqw9yITYuWhpOwpVc'
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
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU0N2Q2ZmYyZjc3YThiZTM3NDZiZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1MzEyNzY2NywiZXhwIjoxNjUzMTQyMDY3fQ.wXYMK3YagVsk0e3YyCxn7vmRjjQqw9yITYuWhpOwpVc'
          },
      })
      .then(res => {
        updateRequests(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [])

  const fulfillRequest = (request, quantity, index) => {
    if (!isNaN(quantity) && 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU0N2Q2ZmYyZjc3YThiZTM3NDZiZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1MzEyNzY2NywiZXhwIjoxNjUzMTQyMDY3fQ.wXYMK3YagVsk0e3YyCxn7vmRjjQqw9yITYuWhpOwpVc') {
      axios.put(API_URL + "/request/fulfill/" + request._id, { quantity: quantity, },
          {
            headers: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU0N2Q2ZmYyZjc3YThiZTM3NDZiZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1MzEyNzY2NywiZXhwIjoxNjUzMTQyMDY3fQ.wXYMK3YagVsk0e3YyCxn7vmRjjQqw9yITYuWhpOwpVc'
          },
      })
      .then(res => {
        const created = {
          ...res.data.created,
          location: request.location,
          creator: request.creator,
        };

        const fulfilled = {
          ...res.data.created,
          location: request.location,
          creator: request.creator,
          provider: user,
        };

        if (created) {
          updateRequests([
            ...requests.slice(0, index),
            fulfilled,
            created,
            ...requests.slice(index + 1),
          ]);
        }
        else {
          updateRequests([
            ...requests.slice(0, index),
            fulfilled,
            ...requests.slice(index + 1),
          ]);
        }
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <div className="cards-wrapper">
        { requests.map((request, index) => (
          <Card
            key={'req' + index}
            fulfillRequest={ fulfillRequest }
            index={ index }
            request={request}/>
        )) }
      </div>
    </div>
  );
}

export default Requests;