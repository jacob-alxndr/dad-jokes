import React, { Component } from "react";
import "./Joke.scss";

class Joke extends Component {
  getEmoji() {
    if (this.props.votes >= 10) {
      return <i className="fas fa-skull"></i>;
    } else if (this.props.votes >= 8) {
      return <i className="fas fa-grin-squint-tears"></i>;
    } else if (this.props.votes >= 6) {
      return <i className="fas fa-grin-tears"></i>;
    } else if (this.props.votes >= 4) {
      return <i className="fas fa-grin-beam"></i>;
    } else if (this.props.votes >= 1) {
      return <i className="fas fa-grin"></i>;
    } else if (this.props.votes === 0) {
      return <i className="fas fa-flushed"></i>;
    } else if (this.props.votes < 0 && this.props.votes >= -1) {
      return <i className="fas fa-meh-rolling-eyes"></i>;
    } else if (this.props.votes <= -2 && this.props.votes >= -3) {
      return <i className="fas fa-surprise"></i>;
    } else if (this.props.votes <= -4 && this.props.votes >= -5) {
      return <i className="fas fa-frown-open"></i>;
    } else if (this.props.votes <= -6 && this.props.votes >= -8) {
      return <i className="fas fa-sad-tear"></i>;
    } else {
      return <i className="fas fa-angry"></i>;
    }
  }
  render() {
    return (
      <div className="Joke">
        <li>
          <div className="Joke__buttons">
            <button className="upvote" onClick={this.props.upVote}>
              &#8593;
              {/* <i class="fas fa-thumbs-up"></i> */}
            </button>
            <div className="Joke__votes">
              <h4>{this.props.votes}</h4>
            </div>
            <button className="downvote" onClick={this.props.downVote}>
              &#8595;
              {/* <i class="fas fa-thumbs-down"></i> */}
            </button>
          </div>

          <div className="Joke__text">
            <p>{this.props.text}</p>
          </div>
        </li>
        <div className="Joke__emoji">
          {/* <i className="fas fa-laugh-squint"></i> */}
          {this.getEmoji()}
        </div>
      </div>
    );
  }
}
export default Joke;
