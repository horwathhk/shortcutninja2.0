import React, { Component } from "react";

export default class SpeedSettings extends Component {
  render() {
    return (
      <div>
        <h1>Speed Settings</h1>
        <p class="lead">
          Select the speed you want to play at, or select Game Mode if you are
          ready for a challenge!
        </p>
        <div class="form-check">
          <input
            class="form-check-input position-static"
            type="checkbox"
            id="blankCheckbox"
            value="option1"
            aria-label="..."
          />
          <label class="form-check-label" for="inlineRadio1">
            <strong>Slow</strong>, I am just trying to learn at the moment.
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input position-static"
            type="checkbox"
            id="blankCheckbox"
            value="option1"
            aria-label="..."
          />
          <label class="form-check-label" for="inlineRadio1">
            <strong>Fast</strong>, I am ready for a challenge!
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input position-static"
            type="checkbox"
            id="blankCheckbox"
            value="option1"
            aria-label="..."
          />
          <label class="form-check-label" for="inlineRadio1">
            <strong>Game Time</strong>, increase the speed by 2% for every
            answer I get correct!
          </label>
        </div>
      </div>
    );
  }
}
