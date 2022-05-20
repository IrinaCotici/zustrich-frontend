import * as React from 'react';
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

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function BasicCard({props}) {

  return (
    <div className='card-wrapper'>
      <div className={ `card-status ${ props.status }`}>{ props.status }</div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            { props.productName } / { props.quantity}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <PlaceIcon></PlaceIcon> {props.location}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <AccountCircleIcon></AccountCircleIcon> {props.moderator}
          </Typography>
          {
            props.providerName ?
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <FavoriteIcon></FavoriteIcon> {props.providerName}
            </Typography> :
            null
          }
        </CardContent>
        <CardActions>
          {
            props.status === 'open' ?
            <TextField id="outlined-basic" label="Quantity" variant="outlined"/> :
            <div className='completed-qty'>{ props.quantity }</div>
          }
          <Button size="small" disabled={ props.status !== 'open' }>FULFILL</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default BasicCard;
