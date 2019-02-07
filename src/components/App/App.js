import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import TronWeb from "tronweb";

import Utils from "../../utils/utils";
import ECommerce from "../ECommerce/ECommerce";
import Lottery from "../Lottery/Lottery";
import Home from "../Home/Home";
import "./App.scss";
require("dotenv").config();

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";
let acc;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };

    this.handleTestClick = this.handleTestClick.bind(this);
    this.tronWeb = window.tronWeb;
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        }

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object as TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }
    // console.log("App state", this.state);
    Utils.setTronWeb(window.tronWeb);

    // this.startEventListener();
  }

  async handleTestClick() {
    acc = await this.tronWeb.trx.getAccount(
      "TP1gXBJKUC6ChaDhbSN3QWmtxDsx4qU2uA"
    ); // returns object => {
    //   address: hex string,
    //   balance: number,
    //   create_time: number,
    //   latest_opration_time: number,
    //   latest_consume_free_time: number
    // }
    const balance = await this.tronWeb.trx.getBalance(
      "TP1gXBJKUC6ChaDhbSN3QWmtxDsx4qU2uA"
    ); // returns number
    const accResources = await this.tronWeb.trx.getAccountResources(
      "TP1gXBJKUC6ChaDhbSN3QWmtxDsx4qU2uA"
    );
    // returns object => {
    //   TotalEnergyLimit: number,
    //   TotalEnergyWeight: number,
    //   TotalNetLimit: number,
    //   TotalNetWeight: number,
    //   freeNetLimit: number
    // }
    const bandwidth = await this.tronWeb.trx.getBandwidth(
      "TP1gXBJKUC6ChaDhbSN3QWmtxDsx4qU2uA"
    ); // returns number
    //Format:
    // tronWeb.transactionBuilder.freezeBalance(
    //   tronWeb.toSun(100),
    //   duration,
    //   "resource",
    //   "owner address",
    //   "receiver address"
    // );

    //Example:
    console.log("acc - 1", acc);
    // console.log(typeof bandwidth);
    console.log("accResources - 1", accResources);
    const freeze = await this.tronWeb.transactionBuilder.freezeBalance(
      this.tronWeb.toSun(100),
      3,
      "ENERGY",
      "TP1gXBJKUC6ChaDhbSN3QWmtxDsx4qU2uA",
      "TP1gXBJKUC6ChaDhbSN3QWmtxDsx4qU2uA"
    );
    console.log("acc - 2", acc);
    // console.log(typeof bandwidth);
    console.log("accResources - 2", freeze);
  }

  render() {
    const { tronWeb } = this.state;
    return (
      <div>
        <header className="header-container">
          <div className="nav-container">
            <Link to="/">Home</Link>&nbsp;
            <Link to="/eCommerce">eCommerce</Link>&nbsp;
            <Link to="/Lottery">Lottery</Link>
          </div>
          <div>
            <button onClick={this.handleTestClick}>TEST</button>
          </div>
          <div className="account-info-container">
            <div>account information</div>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/eCommerce"
            render={() => <ECommerce tronWeb={tronWeb} />}
          />
          <Route path="/Lottery" render={() => <Lottery tronWeb={tronWeb} />} />
        </Switch>
      </div>
    );
  }
}
export default App;

// <Switch>
//   <Route exact path="/" component={Home} />
//   <Route path="/eCommerce" component={ECommerce} />
//   <Route path="/Lottery" component={Lottery} />
// </Switch>
