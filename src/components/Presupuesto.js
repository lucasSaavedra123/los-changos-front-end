import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../assets/scss/moneyManager.scss";
import Typography from '@mui/material/Typography';

export default function Presupuesto(props) {
  const now = 60;
  return( 
    <React.Fragment style={{color: "green"}}>
    <div className='table-title'>
      <div className='titulo-principal'>
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{color: "green"}}>
        Presupuesto del periodo
      </Typography>
      </div>
     
    </div>
    <ProgressBar className='linea-progreso' now={now} label={`${now}%`} />
  </React.Fragment>
  

 
    
  )
}

