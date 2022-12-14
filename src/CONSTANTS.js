import variables from "./assets/scss/constants.scss"
import { createTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";

export const LEMMA = "Nunca manejar la plata fue algo tan cómodo."

export const BACKEND_URL = "https://walletify-backend.herokuapp.com"

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

export const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5cb377"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "& .MuiOutlinedInput-input": {
      color: "white"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white"
    },
    "& .MuiInputLabel-outlined": {
      color: "white"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white"
    },
  }
});


export const ALLOWS_ICONS_FOR_CATEGORY = [
    "AccessibilityNewOutlined",
    "AccountBalanceOutlined",
    "AccountBalanceWalletOutlined",
    "AirplanemodeActiveOutlined",
    "AssistWalkerOutlined",
    "AttachMoneyOutlined",
    "AttractionsOutlined",
    "BabyChangingStationOutlined",
    "BedOutlined",
    "ChurchOutlined",
    "ChildFriendlyOutlined",
    "CurrencyBitcoinOutlined",
    "DeliveryDiningOutlined",
    "Diversity3Outlined",
    "DownhillSkiingOutlined",
    "ElderlyOutlined",
    "ElderlyWomanOutlined",
    "HeadsetMicOutlined",
    "PedalBikeOutlined",
    "RestaurantOutlined",
    "ScienceOutlined",
    "SchoolOutlined",
    "SmokingRoomsOutlined",
    "SportsFootballOutlined",
    "SportsBaseballOutlined",
    "SportsEsportsOutlined",
    "StoreMallDirectoryOutlined",
    "VideocamOutlined"
]
