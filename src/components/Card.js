import * as React from 'react';
import { useState, } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@material-ui/core";
import PlaceIcon from '@mui/icons-material/Place';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';


function BasicCard({request, fulfillRequest, index}) {
  const STATUS_MAP = {
    1: "open",
    2: "pending",
    3: "closed",
  }
  const [quantity, updateQuantity] = useState();

  const onChange = e => {
    updateQuantity(e.target.value);
  }

  const onClick = () => {
    fulfillRequest(request, parseInt(quantity), index);
    updateQuantity("");
  }

  return (
    <div className='card-wrapper'>
      <div className={ `card-status ${ STATUS_MAP[request.status] }`}>{ STATUS_MAP[request.status] }</div>
      <Card className="card-content" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            { request.productName } / { request.productQuantity}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <PlaceIcon></PlaceIcon> {request.location.address}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <AccountCircleIcon></AccountCircleIcon> {request.creator.name}
          </Typography>
          {
            request.provider ?
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <FavoriteIcon></FavoriteIcon> {request.provider.name}
            </Typography> :
            null
          }
        </CardContent>
        <CardActions>
          <TextField
            id="outlined-basic"
            onChange={ onChange }
            value={ quantity }
            disabled={STATUS_MAP[request.status] !== 'open'}
            label="Quantity"
            variant="outlined"/>
          <Button
            size="small"
            onClick={ onClick }
            disabled={ STATUS_MAP[request.status] !== 'open' }>
              FULFILL
            </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default BasicCard;
