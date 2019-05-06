//queries.js
import { gql } from "apollo-boost";

const addShortCutLibraryMutation = gql`
  mutation($libraryName: String!, $actions: [NewActions!]!) {
    addShortcutLibrary(libraryName: $libraryName, actions: $actions) {
      library_id
      libraryName
    }
  }
`;
export { addShortCutLibraryMutation };

//data.js
//data.js
const graphql = require("graphql");
// const db = require("./dbconn.js");
const Shortcuts = require("../models/Shortcuts");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLListType
} = graphql;

let LibraryType = new GraphQLObjectType({
  name: "LibraryType",
  fields: () => ({
    library_id: { type: GraphQLID },
    libraryName: { type: GraphQLString },
    actions: { type: GraphQLList(ActionsType) }
  })
});

// let NewShortcutLibraryType = new GraphQLInputObjectType({
//   name: "NewShortcutLibraryType",
//   fields: () => ({
//     library_id: { type: GraphQLID },
//     libraryName: { type: GraphQLString },
//     action: { type: GraphQLList(NewActionsType) }
//   })
// });

let ActionsType = new GraphQLObjectType({
  name: "Actions",
  fields: () => ({
    actionName: { type: GraphQLString },
    // keyCodes: { type: GraphQLList(GraphQLInt) }
    keyCodes: { type: GraphQLInt }
  })
});

let NewActionsType = new GraphQLInputObjectType({
  name: "NewActions",
  fields: () => ({
    actionName: { type: GraphQLString },
    keyCodes: { type: GraphQLInt }
  })
});

let KeyCodeType = new GraphQLObjectType({
  name: "KeyCodeType",
  fields: () => ({
    keyCode: { type: GraphQLInt }
  })
});

let NewKeyCodeType = new GraphQLInputObjectType({
  name: "NewKeyCodeType",
  fields: () => ({
    keyCode: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    shortcut: {
      type: LibraryType,
      args: { library_id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        //code for getting data from DB
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addShortcutLibrary: {
      type: new GraphQLList(LibraryType),
      args: {
        libraryName: { type: GraphQLString },
        actions: { type: new GraphQLList(NewActionsType) }
      },
      resolve(parent, args) {
        let shortcut = new Shortcuts({
          libraryName: args.libraryName,
          actions: args.actions
        });
        console.log(shortcut);
        return shortcut.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});

//shortcut.js
//shortcuts.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const ShortcutsSchema = new Schema({
  libraryName: {
    type: String,
    require: true
  },
  actions: [
    {
      actionName: String,
      keyCodes: Number
    }
  ]
});

module.exports = mongoose.model("Shortcuts", ShortcutsSchema);

//add library.js
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
//add row button https://stackoverflow.com/questions/46278485/how-to-add-row-to-a-table-using-reactjs-on-button-click
import { addShortCutLibraryMutation } from "../../../queries/queries";
import { graphql, compose } from "react-apollo";

let library = {
  libraryName: "",
  actions: [{}]
};

let actionName;
let keyCodes;

class AddLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: ["row 1"],
      libraryName: "",
      actionName: "",
      keyCodes: null,
      actions: []
    };
    this.addRow = this.addRow.bind(this);
  }

  submitForm = async e => {
    e.preventDefault();
    console.log(library);
    console.log("form woking");
    // let { libraryName, actionName, keyCodes, actions } = this.state;

    const addShortcut = await this.props.addShortCutLibraryMutation({
      variables: {
        library
      }
    });
    console.log(addShortcut);
  };

  addRow = event => {
    let { rows, actions } = this.state;
    rows.push("new row");
    this.setState({ rows: rows });

    library.actions.push({
      actionName,
      keyCodes
    });
    console.log(library);
  };

  render() {
    let { rows } = this.state;
    console.log(library);
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
          <h2>Name Your Shortcut Library</h2>
          <p class="lead">
            Give your library a name so you can select it later.
          </p>
          <Form onSubmit={this.submitForm.bind(this)}>
            <FormGroup>
              <Label id="exampleFormControlInput1">Library Name</Label>
              <Input
                type="text"
                className="form-control"
                id="email"
                placeholder="ex: 64"
                onChange={e => {
                  library.libraryName = e.target.value;
                }}
              />
            </FormGroup>
            <h2>Add Your Keyboard Shortcuts</h2>
            <p class="lead">
              Below, please provide the following:
              <br />
              <strong>keyCodes</strong>:These are the keycodes for the keys that
              make up your shortcut (ex: "ctrl" has a keyCode of 17). You can
              find all keyCodes at{" "}
              <a href="https://keycode.info/">Keycode.info</a>
            </p>
            <div>
              {rows.map(row => (
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
                      <Label id="exampleFormControlInput1">keycode Value</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="ex: 72"
                        onChange={e => {
                          keyCodes = Number(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  {/* <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                    <FormGroup>
                      <Label id="exampleFormControlInput1">keycode Value</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="ex: 72"
                        onChange={e =>
                          this.setState({
                            keyCodes: Number(e.target.value)
                          })
                        }
                      />
                    </FormGroup>
                  </div> */}
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




getCurrentLibrary: {
  type: LibraryType,
  args: { libraryName: { type: GraphQLString }, _id: { type: GraphQLID } },
  resolve: () => {
    return new Promise((args, resolve, reject) => {
      Shortcuts.findOne({ libraryName: "Cha Library" }, fucntion=>{(
        err,
        shortcuts
      ) {
        if (err) reject(err);
        else {
          console.log(shortcuts);
          console.log(shortcuts.libraryName);
          resolve(shortcuts);
        }
      });
    });
  }
}
}


getCurrentLibrary: {
  type: LibraryType,
  args: { libraryName: { type: GraphQLString }, _id: { type: GraphQLID } },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      Shortcuts.findOne({ libraryName: "Cha Library" }, function(
        err,
        shortcuts,
        libraryName
      ) {
        if (err) reject(err);
        else {
          console.log(shortcuts);
          resolve(shortcuts);
        }
      });
    });
  }
}

 getCurrentLibrary: {
      type: LibraryType,
      args: { libraryName: { type: GraphQLString }, _id: { type: GraphQLID } },
      resolve: (root, args) => {
        return new Promise((resolve, reject) => {
          Shortcuts.findOne(
            { libraryName: args.libraryName },
            (err, shortcuts) => {
              if (err) reject(err);
              else {
                console.log(shortcuts);
                resolve(shortcuts);
                console.log(args.libraryName);
              }
            }
          );
        });
      }
    }