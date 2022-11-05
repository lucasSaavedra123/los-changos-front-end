import { Button, Grid } from "@mui/material";
import Presupuesto from "./Presupuesto";
export default function PresupuestoHistoricoItem(props) {


    return(

        <Grid container spacing={0.5}>
            <Grid item lg={10}>
                <Presupuesto/>
            </Grid>
            <Grid item lg={2}>
                <Button>Eliminar presupuesto</Button>
            </Grid>
        </Grid>

        


    )

}