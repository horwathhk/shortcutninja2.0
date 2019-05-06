import React, { Component } from "react";
import TextScroll from "react-textscroll";
import Scroll from "./Scroll";

export default class MainView extends Component {
  render() {
    console.log(this.props.libraryName);
    return (
      <div>
        <div class="dashboard-wrapper">
          <div class="dashboard-ecommerce">
            <div class="container-fluid dashboard-content ">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="page-header">
                    <h2 class="pageheader-title">
                      <i />
                      Shortcut Ninja
                    </h2>
                  </div>
                </div>
              </div>
              <Scroll libraryName={this.props.libraryName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
