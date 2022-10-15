import { useRef, React, useEffect,useState,useContext } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@material-ui/core';
import { BACKEND_URL } from "../CONSTANTS";
import { AuthContext } from "../context/AuthContext";
import Button from '@mui/material/Button'

  export const DateFilter = (props) =>{

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const { currentUser } = useContext(AuthContext);

    const applyDateFilter = () => {
        console.log(dateTo.toISOString().split('T')[0])
        fetch(BACKEND_URL+'/expense/filter', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    
            
            body: JSON.stringify({
                timeline:[dateFrom.toISOString().split('T')[0],dateTo.toISOString().split('T')[0]]
            })
    
    
        })
        .then((res)=>res.json())
        .then((data) =>props.updateFilterTransactions(data))
    }


    const handleChangeFrom = (newValue) => {
        setDateFrom(newValue);
    };

    const handleChangeTo = (newValue) => {
        setDateTo(newValue);
    };
    
    
    
    
    
    return (
        <>
        Filtar desde: 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
                className="textfield"
                inputFormat="YYYY-MM-DD"
                maxDate={dateTo}
                value={dateFrom}
                onChange={handleChangeFrom}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        Hasta: 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
                className="textfield"
                minDate={dateFrom}
                inputFormat="YYYY-MM-DD"
                value={dateTo}
                onChange={handleChangeTo}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <Button className="add-expense-button" style={{color:"black", textDecoration:"none"}} onClick={applyDateFilter}>
            Aplicar
          </Button>

        </>
    )
  }


  export default DateFilter;