import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopAppBar from "./components/AppBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <TopAppBar />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </Provider>
  );
};

export default App;
