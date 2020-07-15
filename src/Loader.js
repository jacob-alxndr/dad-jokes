import React, { Component } from "react";
import "./Loader.scss";
class Loader extends Component {
  render() {
    return (
      <div>
        <div className="Loader">
          <i className="fas fa-grin-tears"></i>
          <h1>Loading . . .</h1>
        </div>
      </div>
    );
  }
}
export default Loader;
