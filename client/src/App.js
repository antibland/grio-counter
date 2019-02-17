import React, { Component } from "react";
import Login from "./Login";
import LoggedIn from "./LoggedIn";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    if (
      typeof window.localStorage.getItem("token") !== "undefined" &&
      window.localStorage.getItem("token") != null
    ) {
      this.setState({ loggedIn: true });
    }
  }

  checkAuth(result) {
    if (result === true) {
      window.location.reload();
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="App">
        {loggedIn ? <LoggedIn /> : <Login checkAuth={this.checkAuth} />}
      </div>
    );
  }
}

export default App;
