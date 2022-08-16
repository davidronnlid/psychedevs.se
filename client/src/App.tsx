import Products from "./components/products";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Typography from "@mui/material/Typography";
import HideAppBar from "./components/header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SuccessfulPayment from "./components/successfulPayment";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <HideAppBar children={<></>} />

          <Typography variant="h3" sx={{ mt: "20vh", mb: 0 }}>
            Utveckla dig själv med PsycheDevs
          </Typography>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/payment-successful" element={<SuccessfulPayment />} />
          </Routes>
        </div>
      </Provider>{" "}
    </BrowserRouter>
  );
};

export default App;
