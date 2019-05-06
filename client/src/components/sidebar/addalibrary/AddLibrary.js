import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
//add row button https://stackoverflow.com/questions/46278485/how-to-add-row-to-a-table-using-reactjs-on-button-click
import { addShortCutLibraryMutation } from "../../../queries/queries";
import { graphql, compose } from "react-apollo";

let libraryName;
let libraryDescription = "";
let actionsArray = [{}];

let actionName;
let keyCodes = [{}];
let keyCode;
let keyName;
class AddLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: ["row 1"],
      libraryName: "",
      libraryDescription: "",
      actionName: "",
      keyCode1: null,
      keyCode2: null,
      keyName1: null,
      keyName2: null,
      actions: []
    };
    this.addRow = this.addRow.bind(this);
  }

  addRow = event => {
    let { rows, actions, keyCode1, keyCode2, keyName1, keyName2 } = this.state;
    rows.push("new row");
    this.setState({ rows: rows });

    keyCode = keyCode1;
    keyName = keyName1;

    keyCodes.push({
      keyCode,
      keyName
    });
    console.log(keyCodes);

    keyCode = keyCode2;
    keyName = keyName2;

    keyCodes.push({
      keyCode,
      keyName
    });

    actionsArray.push({
      actionName,
      keyCodes
    });

    console.log(actionsArray);
    keyCode = null;
    keyName = null;
    keyCodes = [{}];
    actionName = "";
  };

  submitForm = async e => {
    e.preventDefault();
    console.log(typeof actionArray);
    const addShortcut = await this.props.addShortCutLibraryMutation({
      variables: {
        libraryName: libraryName,
        libraryDescription: libraryDescription,
        actions: actionsArray
      }
    });
    // console.log(addShortcut);
  };

  render() {
    let { rows, keyCodes } = this.state;
    // console.log(actionsArray);
    return (
      <div style={{ background: "white" }}>
        <div className="col-md-10 m-auto">
          <h1 class="display-4">Create a Custom Shortcut Library</h1>
          <p class="lead">
            Below, you can upload your own custom shortcut library. Once it is
            created, you will be redirected to the settings page where your new
            customer library will be available for selection. From there, select
            your library, hit SAVE and then head over to the game board to
            practice!
          </p>
          <hr />
          <h2>Shortcut Library Name and Description</h2>
          <p class="lead">
            Give your library a name and description so users can select it
            later.
          </p>
          <Form onSubmit={this.submitForm.bind(this)}>
            <FormGroup>
              <Label id="exampleFormControlInput1">Library Name</Label>
              <Input
                type="text"
                className="form-control"
                id="email"
                placeholder="ex: New Layer Mask Efficiency Library"
                onChange={e => {
                  libraryName = e.target.value;
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label id="exampleFormControlInput1">Library Description</Label>
              <Input
                type="text"
                className="form-control"
                id="email"
                placeholder="ex: This library focuses on efficiency in New Layer Mask"
                onChange={e => {
                  libraryDescription = e.target.value;
                }}
              />
            </FormGroup>
            <hr />
            <h2>Add Your Keyboard Shortcuts</h2>
            <p class="lead">Below, please provide the following:</p>

            <h5>
              {" "}
              <strong>Action Name</strong>:This describes what the action does.
              <a href="https://keycode.info/">Keycode.info</a>
            </h5>
            <h5>
              {" "}
              <strong>keyCodes</strong>:These are the keycodes for the keys that
              make up your shortcut (ex: "ctrl" has a keyCode of 17). You can
              find all keyCodes at{" "}
              <a href="https://keycode.info/">Keycode.info</a>
            </h5>
            <h5>
              {" "}
              <strong>Key Names</strong>:These are the names of the keys that
              the user needs to press to use the action.
              <a href="https://keycode.info/">Keycode.info</a>
            </h5>

            <div>
              {rows.map(row => (
                <div>
                  <div className="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                      <FormGroup>
                        <Label id="exampleFormControlInput1">
                          Name of the Action
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="ex. Open Pen Tool"
                          onChange={e => {
                            actionName = e.target.value;
                          }}
                        />
                      </FormGroup>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                      <FormGroup>
                        <Label id="exampleFormControlInput1">
                          keycode Value
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="ex: 72"
                          onChange={e =>
                            this.setState({
                              keyCode1: Number(e.target.value)
                            })
                          }
                        />
                      </FormGroup>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                      <FormGroup>
                        <Label id="exampleFormControlInput1">
                          Keycode Name Value
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="ex: CTRL"
                          onChange={e =>
                            this.setState({
                              keyName1: e.target.value
                            })
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4" />
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                      <FormGroup>
                        <Label id="exampleFormControlInput1">
                          keycode Value
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="ex: 72"
                          onChange={e =>
                            this.setState({
                              keyCode2: Number(e.target.value)
                            })
                          }
                        />
                      </FormGroup>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                      <FormGroup>
                        <Label id="exampleFormControlInput1">
                          Key Name Value
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="ex: CTRL"
                          onChange={e =>
                            this.setState({
                              keyName2: e.target.value
                            })
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              class="btn btn-info"
              style={{ backgroundColor: "#7a80b4" }}
              onClick={this.addRow}
            >
              ADD Shortcut
            </button>
            <FormGroup>
              <Input
                // disabled={!isEnabled}
                type="submit"
                classNameName="btn btn-info btn-block mt-4"
              />
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

// export default AddLibrary;
export default compose(
  graphql(addShortCutLibraryMutation, { name: "addShortCutLibraryMutation" })
)(AddLibrary);
