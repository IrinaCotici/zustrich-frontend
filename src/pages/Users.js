import { useEffect, useState, } from 'react';
import axios from "axios";
import { API_URL, } from "../utils/constants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Header from '../components/Header';

function Users() {
  const [user, updateUser] = useState({});
  const [users, updateUsers] = useState([]);

  const ROLE_MAP = {
    1: "Admin",
    2: "Moderator",
    3: "Provider",
  }

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

      axios.get(API_URL + "/user",
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateUsers(res.data);
      })
      .catch(err => console.log(err))
    }
  }, [localStorage.getItem("token")])

  const toogleUserBlocked = id => () => {
    if (localStorage.getItem("token")) {
      axios.put(API_URL + "/user/toogle_block/" + id, {},
          {
            headers: {
              token: localStorage.getItem("token")
          },
      })
      .then(res => {
        updateUsers(users.map(user => user._id === id ? { ...user, blocked: !user.blocked, } : user))
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <div className="table-wrapper">
        <a className="add-btn" href='/add-user'>+ ADD USER</a>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>PHONE</TableCell>
                <TableCell>LOCATION</TableCell>
                <TableCell>ROLE</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { users.map(user => (
                <TableRow
                  key={user.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.location?.name}</TableCell>
                  <TableCell>{ROLE_MAP[user.role]}</TableCell>
                  <TableCell>
                    { user.role !== 1 && (
                      <Chip
                        label={ user.blocked ? "Blocked" : "Active"}
                        onClick={ toogleUserBlocked(user._id) }
                        color={ user.blocked ? "error" : "info"}/>
                    )}
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Users;