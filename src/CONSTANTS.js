import variables from "./assets/scss/constants.scss"
import { createTheme } from '@mui/material/styles';

export const LEMMA = "Nunca manejar la plata fue algo tan cómodo."

export const THEME = createTheme({
    palette: {
        primary: {
            light: variables.primaryColor,
            main: variables.primaryColor,
            dark: variables.primaryColor,
            contrastText: '#000',
        },
        secondary: {
            light: variables.secondaryColor,
            main: variables.secondaryColor,
            dark: variables.secondaryColor,
            contrastText: '#000',
        },
    },
});
