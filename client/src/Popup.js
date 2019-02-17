import React, { Component } from "react";
import PropTypes from "prop-types";

export class Popup extends Component {
  constructor(props) {
    super(props);

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handleCancelClick() {
    if (typeof this.props.onCancel === "function") {
      this.props.onCancel();
    }
  }

  handleConfirmClick() {
    if (typeof this.props.onConfirm === "function") {
      this.props.onConfirm();
    }
  }

  render() {
    const { currCount, nextCount } = this.props;
    return (
      <div className="modal">
        <p>Current count: {currCount}</p>
        <p>Next count: {nextCount}</p>
        <div className="buttons">
          <button onClick={this.handleCancelClick}>Cancel</button>
          <button onClick={this.handleConfirmClick}>Confirm</button>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  currCount: PropTypes.number.isRequired,
  nextCount: PropTypes.number.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

export default Popup;
