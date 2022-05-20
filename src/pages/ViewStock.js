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

  const status = 'closed';
  const productName = 'iaurt cu fructe';
  const quantity = 10;

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
      <div className='tables-wrapper'>
        <div className='requests-wrapper'>
          <div className='header'>PENDING REQUESTS</div>
          <div className='body'></div>
        </div>
        <Stock></Stock>
      </div>
    </div>
  );
}

export default ViewStock;