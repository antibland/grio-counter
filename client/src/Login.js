import React, { Component } from "react";
import PropTypes from "prop-types";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "dummy",
      password: "user"
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.type === "success" && data.token) {
          window.localStorage.setItem("token", data.token);
          this.props.checkAuth(true);
        } else {
          this.props.checkAuth(false);
        }
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <form
        action="/api/login"
        method="POST"
        onSubmit={this.handleSubmit}
        className="loginForm"
      >
        <div className="row">
          <label className="formLabel" htmlFor="username">
            Username
          </label>
          <input
            required
            value={username}
            placeholder="dummy"
            className="formInput"
            type="text"
            id="username"
            onChange={this.handleInput}
          />
        </div>
        <div className="row">
          <label className="formLabel" htmlFor="password">
            Password
          </label>
          <input
            required
            value={password}
            placeholder="user"
            className="formInput"
            type="password"
            id="password"
            onChange={this.handleInput}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  }
}

Login.propTypes = {
  checkAuth: PropTypes.func.isRequired
};

export default Login;
