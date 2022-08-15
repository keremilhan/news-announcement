import AppRouter from "./router/AppRouter";
import store from "./store/index";
import { Provider } from "react-redux";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[300],
      light: indigo[50],
    },
    secondary: {
      light: "#9e9e9e",
      main: "#424242",
      dark: "#000",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
