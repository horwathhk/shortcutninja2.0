import React, { Component } from "react";

export default class LibrarySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e) {
    console.log("check fired");
    this.setState({
      checked: e.target.checked
    });
  }

  render() {
    return (
      <div>
        <dl class="row">
          <dt class="col-sm-2">
            <div class="form-check">
              <input
                class="form-check-input position-static"
                type="checkbox"
                id="blankCheckbox"
                value="option1"
                aria-label="..."
                onChange={this.handleCheck}
                checked={this.state.checked}
                onClick={this.props.getLibraryName.bind(
                  this,
                  this.props.shortcutLibrary.libraryName
                )}
              />

              <label class="form-check-label" for="inlineRadio1">
                {this.props.shortcutLibrary.libraryName}
              </label>
            </div>
          </dt>
          <dd class="col-sm-8">
            This library focuses on shortcuts for faster and editing and improve
          </dd>
        </dl>
      </div>
    );
  }
}
