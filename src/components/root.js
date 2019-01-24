import React, { Component } from "react";
import { HashRouter } from "react-router-dom";

import App from "./App/App";

class Root extends Component {
  render() {
    return (
      <HashRouter>
        <App />
      </HashRouter>
    );
  }
}

export default Root;
