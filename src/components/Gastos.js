import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';


export default function Gastos(props) {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Cambiar para que sean gastos del mes actual
  return (
    <React.Fragment>
      <Title>Gastos del mes</Title>
      <Typography component="p" variant="h4">
      $ {addCommas(props.total)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {props.month}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}