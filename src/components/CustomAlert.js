import React from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CustomAlert = (props) => {
    return(
          <>
            <Snackbar open={props.open} autoHideDuration={3000} onClose={props.closeAction}>
                <Alert onClose={props.closeAction} severity={props.severity}>{props.text}</Alert>
            </Snackbar>
        </>
    );
}

export default CustomAlert;