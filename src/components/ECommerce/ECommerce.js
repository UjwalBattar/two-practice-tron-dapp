import React, { Component } from "react";
// import Swal from "sweetalert2";
// import Masonry from "masonry-layout";
// import $ from "jquery";

// import Utils from "../../utils/utils";
import eCommerceData from "./eCommerce-data";
import "./ECommerce.scss";

/// Add your contract address here////////////////////////////////
// const contractAddress = "";
/////////////////////////////////////////////////////////////////
class ECommerce extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: []
    };
    this.populateItems = this.populateItems.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleTestClick = this.handleTestClick.bind(this);
  }

  async componentDidMount() {
    // console.log(eCommerceData.length);
    this.setState({
      allItems: this.populateItems(eCommerceData)
    });

    // console.log("~~~~~~~~~something", this.props.tronWeb.installed);
    // acc = await
    // Utils.setTronWeb(window.tronWeb, contractAddress);
  }

  addItemToStore() {}

  handlePurchase() {
    // Swal.fire({
    //   title: "Purchased!",
    //   type: "success"
    // });
  }

  async handleTestClick() {
    console.log("-----second", window.tronWeb);
    console.log(this.props.tronWeb.installed);
  }

  populateItems(data) {
    const shoes = [];
    for (let i = 0; i < data.length; i++) {
      let imgPath = data[i].image;

      shoes.push(
        <div className="eCommerce-item" key={i}>
          <img className="item-image" src={imgPath} alt={data[i].name} />
          <div className="item-name">{data[i].name}</div>
          <div className="price-buy-container">
            <div className="item-price">
              $ {parseFloat(Math.random() * 49 + 51).toFixed(2)}
            </div>
            <button className="buy-button" onClick={this.handlePurchase}>
              Buy
            </button>
          </div>
        </div>
      );
    }
    return shoes;
  }

  render() {
    const { allItems } = this.state;
    return (
      <div>
        <h1>This is the eCommerce page</h1>
        <button onClick={this.handleTestClick}>TEST</button>
        <div className="eCommerce-index" />
        <div className="eCommerce-item-container">{allItems}</div>
      </div>
    );
  }
}

export default ECommerce;
