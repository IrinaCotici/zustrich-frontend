import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Header from '../components/Header';
import { TextField, Button } from "@material-ui/core";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import IconButton from '@mui/material/IconButton';

function createData(name, quantity) {
  return { name, quantity};
}

const rows = [
  createData('Pahare de hartie', 20),
];

function Stock() {
  return (
    <div className="main-container wrapper stock-wrapper">
        <TableContainer component={Paper}>
          <Table sx={{ }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>
                    <div className='qty-input-wrapper'>
                    <IconButton><DoNotDisturbOnIcon></DoNotDisturbOnIcon></IconButton>
                      <input placeholder='Quantity'></input>
                      <IconButton><AddCircleIcon></AddCircleIcon></IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
              <TableCell>
                <TextField id="outlined-basic" label="Product name" variant="outlined"/>
              </TableCell><TableCell>
                <TextField id="outlined-basic" label="Quantity" variant="outlined"/>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary">SAVE</Button>
              </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}

export default Stock;