import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";

//components
import SidebarView from "./components/sidebar/SidebarView";
import FooterView from "./components/footer/FooterView";
import MainView from "./components/main/MainView";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import GameSettingsView from "./components/sidebar/gameSettings/GameSettingsView";
import AddALibraryView from "./components/sidebar/addalibrary/AddALibraryView";

const client = new ApolloClient({
  uri: "http://localhost:4000/ninja",
  credentials: "same-origin"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryName: ""
    };
  }

  getLibraryName = libraryName => {
    console.log(libraryName);
    this.setState({ libraryName: libraryName }, function() {
      console.log(this.state.libraryName);
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <div class="dashboard-main-wrapper">
              <DashboardHeader />
              <SidebarView />
              <Route
                exact
                path="/"
                component={() => (
                  <MainView libraryName={this.state.libraryName} />
                )}
              />
              <Route
                exact
                path="/game-settings"
                component={() => (
                  <GameSettingsView getLibraryName={this.getLibraryName} />
                )}
              />
              <Route
                exact
                path="/add-a-shortcut-library"
                component={AddALibraryView}
              />
              <FooterView />
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
