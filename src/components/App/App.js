import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import ECommerce from "../ECommerce/ECommerce";
import Lottery from "../Lottery/Lottery";
import Home from "../Home/Home";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/eCommerce">eCommerce</Link>&nbsp;
          <Link to="/Lottery">Lottery</Link>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/eCommerce" component={ECommerce} />
          <Route path="/Lottery" component={Lottery} />
        </Switch>
      </div>
    );
  }
}
export default App;
