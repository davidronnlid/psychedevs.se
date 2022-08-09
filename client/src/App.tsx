import Products from "./components/products";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Typography from "@mui/material/Typography";
import juhani from "./images/juhani.jpg";
import HideAppBar from "./components/header";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <HideAppBar children={<></>} />

        <Typography variant="h3" sx={{ mt: "20vh", mb: 0 }}>
          Utveckla dig själv med PsycheDevs
        </Typography>

        {/* <img src={juhani} style={{ width: "30vw", margin: "1rem" }} /> */}

        <Products />
      </div>
    </Provider>
  );
};

export default App;
