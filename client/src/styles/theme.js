// theme.js
import { createTheme } from "@mui/material/styles";

const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1d1d1d" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1d1d1d" : "#ffffff",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: darkMode ? "#ffffff" : "#000000",
            "&.Mui-selected": {
              backgroundColor: darkMode ? "#90caf9" : "#1976d2",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: darkMode ? "#ffffff" : "#000000",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: darkMode ? "#f1ba66" : "#5b7564",
          },
        },
      },
    },
  });

export default getTheme;
