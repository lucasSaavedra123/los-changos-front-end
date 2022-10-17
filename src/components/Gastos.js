import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Gastos(props) {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Cambiar para que sean gastos del mes actual
  return (
    <React.Fragment>
      <Title>Gastos</Title>
      <Typography component="p" variant="h4">
      $ {addCommas(props.total)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Octubre 2022
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}