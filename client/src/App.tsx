import React, { useEffect } from "react";
import Products from "./components/products";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import HideAppBar from "./components/header";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <HideAppBar children={<></>} />

        <Products />
      </div>
    </Provider>
  );
};

export default App;
