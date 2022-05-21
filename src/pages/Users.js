import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Header from '../components/Header';

function createData(name, email, phone, location, role, status) {
  return { name, email, phone, location, role, status };
}

const rows = [
  createData('Superadmin', 'admin@gmail.com', '00000000000', 'Gara de nord', 'admin', 1),
];

function Users() {
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
              { rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    { row.status ? 
                      <Chip label="Active" color="info"/> :
                      <Chip label="Blocked" color="error"/> 
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

export default Users;