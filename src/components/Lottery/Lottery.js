import React, { Component } from "react";

class Lottery extends Component {
  constructor(props) {
    super(props);

    this.handleTestClick = this.handleTestClick.bind(this);
  }

  componentDidMount() {
    console.log("lottery props ------->", this.props);
  }

  handleTestClick() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~`this is for testing");
  }
  render() {
    return (
      <div>
        <h1>This is the Lottery page</h1>
        <div>
          <button onClick={this.handleTestClick}>TEST</button>
        </div>
      </div>
    );
  }
}

export default Lottery;
