import React, { Component } from "react";
import AllSettings from "./AllSettings";

export default class GameSettingsView extends Component {
  getLibraryName = libraryName => {
    console.log(libraryName);
    this.props.getLibraryName(libraryName);
  };

  render() {
    return (
      <div>
        <div class="dashboard-wrapper">
          <div class="dashboard-ecommerce">
            <div class="container-fluid dashboard-content ">
              <AllSettings getLibraryName={this.getLibraryName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
