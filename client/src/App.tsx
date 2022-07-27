import React, { useEffect } from "react";
import Products from "./components/products";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Products />
      </div>
    </Provider>
  );
};

export default App;

// https://blog.logrocket.com/modern-api-data-fetching-methods-react/
