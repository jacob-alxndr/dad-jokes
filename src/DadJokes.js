import React, { Component } from "react";
import { fetchData } from "./api";
import Joke from "./Joke";
import Loader from "./Loader";
import "./DadJokes.scss";
class DadJokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(localStorage.getItem("storedJokes")) || [],
      loaded: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.text));
    this.getJokes = this.getJokes.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  async getJokes() {
    this.setState({ loaded: false });
    let jokes = [];
    while (jokes.length < 10) {
      const prom = fetchData();
      jokes.push(prom);
    }
    Promise.all(jokes).then((data) => {
      let jokes = [];
      data.forEach((item) => {
        const { id, joke } = item;
        if (!this.seenJokes.has(joke)) {
          console.log(this.seenJokes);
          this.seenJokes.add(joke);
          jokes.push({ id, joke, votes: 0 });
        }
      });
      this.setState((s) => ({ jokes: [...s.jokes, ...jokes], loaded: true }));
    });
  }

  componentDidUpdate() {
    localStorage.setItem("storedJokes", JSON.stringify(this.state.jokes));
  }

  handleVote(id, sign) {
    this.setState({
      jokes: this.state.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + sign } : j
      ),
    });
  }

  componentDidMount() {
    console.log(this.state.jokes.length > 0);
    if (this.state.jokes.length <= 0) {
      this.getJokes();
    } else {
      this.setState({ loaded: true });
    }
  }
  render() {
    let isLoading;
    // let ordered = this.state.jokes.sort((a, b) => a.votes < b.votes);
    !this.state.loaded
      ? (isLoading = <Loader />)
      : (isLoading = (
          <div className="DadJokes__container">
            <header>
              <h1> Dad Jokes</h1>
              <div className="DadJokes__img_container">
                <i className="fas fa-grin-squint-tears"></i>
              </div>
              <button onClick={this.getJokes}>Give me more jokes</button>
            </header>

            <div className="DadJokes__jokes-list">
              {this.state.jokes.map((joke) => (
                <Joke
                  key={joke.id}
                  alt="Emoji"
                  text={joke.joke}
                  votes={joke.votes}
                  upVote={() => this.handleVote(joke.id, 1)}
                  downVote={() => this.handleVote(joke.id, -1)}
                />
              ))}
            </div>
          </div>
        ));
    return <div className="DadJokes">{isLoading}</div>;
  }
}
export default DadJokes;
