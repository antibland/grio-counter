import React, { Component } from "react";
import Popup from "./Popup";
const token = window.localStorage.getItem("token") || null;

export class LoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      currCount: null,
      nextCount: null
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  updateCount({ currCount, nextCount }) {
    this.setState({
      currCount,
      nextCount
    });
  }

  incrementCount() {
    fetch("api/counter/increment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token
      })
    })
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .then(res => res.json())
      .then(data => {
        this.updateCount(data);
      });
  }

  componentWillMount() {
    fetch("/api/counter/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token
      })
    })
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .then(res => res.json())
      .then(data => {
        this.updateCount(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleCancel() {
    this.setState({ showPopup: false });
  }

  handleConfirm() {
    this.incrementCount();
    this.setState({ showPopup: false });
  }

  showPopup() {
    this.setState({ showPopup: true });
  }

  render() {
    const { currCount, nextCount, showPopup } = this.state;
    return (
      <>
        <div className="counterContainer">
          <p>Count: {currCount}</p>
          <button onClick={this.showPopup}>Increment</button>
        </div>
        {showPopup && (
          <Popup
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
            currCount={currCount}
            nextCount={nextCount}
          />
        )}
      </>
    );
  }
}

export default LoggedIn;
