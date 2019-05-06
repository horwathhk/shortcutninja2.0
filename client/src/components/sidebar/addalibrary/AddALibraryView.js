import React, { Component } from "react";
import AddLibrary from "./AddLibrary";

export default class AddALibraryView extends Component {
  render() {
    return (
      <div>
        <div class="dashboard-wrapper">
          <div class="dashboard-ecommerce">
            <div class="container-fluid dashboard-content ">
              {/* <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="page-header">
                    <h2 class="pageheader-title">
                      <i />
                    </h2>
                  </div>
                </div>
              </div> */}

              <AddLibrary />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
