import { useEffect, useState, } from 'react';
import axios from "axios";
import { API_URL, } from "../utils/constants";
import {
  Link
} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../components/Header';

function Locations() {
  const [user, updateUser] = useState({});
  const [locations, updateLocations] = useState([]);

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

      axios.get(API_URL + "/location",
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        let locations = res.data;

        axios.get(API_URL + "/user",
          {
            headers: {
              token: localStorage.getItem("token")
          },
        })
        .then(res => {
          locations = locations.map(location => ({
            ...location,
            moderators: res.data
              .filter(user => user.location?._id === location._id && user.role !== 3 && !user.blocked)
              .map(user => user.name)
              .join(", "),
          }))
          updateLocations(locations);
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }
  }, [localStorage.getItem("token")])

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <div className="table-wrapper">
        <a className="add-btn" href='/add-location'>+ ADD LOCATION</a>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>MODERATORS</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>STOCK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { locations.map((location) => (
                <TableRow
                  key={location.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.moderators}</TableCell>
                  <TableCell>{location.description}</TableCell>
                  <TableCell>
                    {
                      user.location?._id === location._id ?
                      <Link to={"/location/" + location._id}>SEE THE STOCK</Link> :
                      null
                    }
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Locations;