import { useState, } from 'react';
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

function Stock({stock, rights, updateStock, addProduct}) {
  const [quantity, updateQuantity] = useState({});
  const [newName, updateNewName] = useState();
  const [newQuantity, updateNewQuantity] = useState();

  const onChange = (name) => (e) => {
    updateQuantity({ ...quantity, [name]: e.target.value, });
  }

  const onChangeName = (e) => {
    updateNewName(e.target.value);
  }

  const onChangeQuantity = (e) => {
    updateNewQuantity(e.target.value);
  }

  const onClick = (name, type) => () => {
    updateStock(name, type * parseInt(quantity[name]));
    updateQuantity({ ...quantity, [name]: "", });
  }

  return (
    <div className="main-container wrapper stock-wrapper">
        <TableContainer component={Paper}>
          <Table sx={{ }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>PENDING</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { stock?.map((stockItem) => (
                <TableRow
                  key={stockItem.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{stockItem.name}</TableCell>
                  <TableCell>{stockItem.available}</TableCell>
                  <TableCell>{stockItem.pending}</TableCell>
                  <TableCell>
                    <div className='qty-input-wrapper'>
                      <IconButton
                        onClick={ onClick(stockItem.name, -1) }
                        disabled={ !rights }>
                        <DoNotDisturbOnIcon className={ !rights ? "disabled" : "" } />
                      </IconButton>
                      <input
                        onChange={ onChange(stockItem.name) }
                        value={ quantity[stockItem.name] }
                        disabled={ !rights }
                        placeholder='Quantity'></input>
                      <IconButton
                        onClick={ onClick(stockItem.name, 1) }
                        disabled={ !rights }>
                        <AddCircleIcon className={ !rights ? "disabled" : "" }/>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              { rights && (
                <TableRow>
                    <TableCell>
                      <TextField onChange={onChangeName} id="outlined-basic" label="Product name" variant="outlined"/>
                    </TableCell>
                    <TableCell>
                      <TextField onChange={onChangeQuantity} id="outlined-basic" label="Quantity" variant="outlined"/>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={ addProduct(newName, parseInt(newQuantity)) }
                        variant="contained"
                        color="primary">
                          SAVE
                      </Button>
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}

export default Stock;