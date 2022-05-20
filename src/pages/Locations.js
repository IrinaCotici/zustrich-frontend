import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../components/Header';

function createData(name, address, moderators, description, stock) {
  return { name, address, moderators, description, stock};
}

const rows = [
  createData('Gara de nord', 'Calea Grivitei nr 21', 'admin@gmail.com', 'Gara de nord edwceec eededw eddw ed. eddswd', 'see the stock'),
];

function Locations() {
  return (
    <div className="main-container wrapper">
      <Header></Header>
      <div className="table-wrapper">
        <a class="add-btn" href='/add-location'>+ ADD LOCATION</a>
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
              { rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.moderators}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell><a class="add-btn">{row.stock}</a></TableCell>
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