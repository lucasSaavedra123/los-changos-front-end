import variables from "./assets/scss/constants.scss"
import { createTheme } from '@mui/material/styles';

export const AUTH0_DOMAIN_URL = "dev-t-whycve.us.auth0.com"
export const AUTH0_CLIENT_ID = "SrHBjBWR43jZo33ckYuRUkc2lwZoKfcm"
export const AUTH0_DATABASE_CONNECTION = "Username-Password-Authentication"

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
