import React, { Component } from "react";
import LibrarySelection from "./LibrarySelection";
import SpeedSettings from "./SpeedSettings";
import { getAllLibrariesQuery } from "../../../queries/queries";
import AddLibrary from "../addalibrary/AddLibrary";
import { Query } from "react-apollo";

export default class AllSettings extends Component {
  getLibraryName = libraryName => {
    console.log(libraryName);
    this.props.getLibraryName(libraryName);
  };
  render() {
    const libraries = (
      <div>
        <Query query={getAllLibrariesQuery}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="card" id="loader">
                    <div class="card-body">
                      <div class="d-flex justify-content-center">
                        {/* <span class="dashboard-spinner spinner-xxl" />
                      <span class="dashboard-spinner spinner-xl" />
                      <span class="dashboard-spinner spinner-lg" /> */}
                        <span class="dashboard-spinner spinner-md" />
                        {/* <span class="dashboard-spinner spinner-sm" />
                      <span class="dashboard-spinner spinner-xs" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            if (error) return <div>Error</div>;
            if (data === null) return <div>No Saved library</div>;
            // let shortcutLibraries = [];

            if (data) {
              console.log("fired");

              let libraries;
              let shortcutLibraries = data.getAllLibraries;
              console.log(shortcutLibraries);
              if (shortcutLibraries) {
                console.log("fired Query");
                libraries = shortcutLibraries.map(shortcutLibrary => (
                  <LibrarySelection
                    key={shortcutLibrary._id}
                    shortcutLibrary={shortcutLibrary}
                    getLibraryName={this.getLibraryName}
                  />
                ));
              }
              return libraries;
            }
          }}
        </Query>
      </div>
    );
    return (
      <div>
        <div style={{ background: "white" }}>
          <div className="col-md-10 m-auto">
            <h1 class="display-4">Game Settings</h1>
            <p class="lead">
              Select the settings you want to make sure that Shortcut Ninja is
              doin' for ya' what ya' need!
            </p>
            <hr />
            <h1>Shortcut Libraries</h1>
            <p class="lead">
              We offer different libraries for different focuses in Photoshop.
              You can read the descriptions to decide which ones sounds like it
              would help you the most.
            </p>

            <div>{libraries}</div>
            <hr />
            <div>
              <SpeedSettings />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
