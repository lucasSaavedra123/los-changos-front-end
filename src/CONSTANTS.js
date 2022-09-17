import variables from "./assets/scss/constants.scss"
import { createTheme } from '@mui/material/styles';

export const LEMMA = "Nunca manejar la plata fue algo tan comodo."

export const THEME = createTheme({
    palette: {
        primary: {
            light: variables.primaryColor,
            main: variables.primaryColor,
            dark: variables.primaryColor,
            contrastText: '#fff',
        },
        secondary: {
            light: variables.secondaryColor,
            main: variables.secondaryColor,
            dark: variables.secondaryColor,
            contrastText: '#000',
        },
    },
});
