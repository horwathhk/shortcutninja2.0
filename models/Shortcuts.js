//shortcuts.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const ShortcutsSchema = new Schema({
  libraryName: {
    type: String,
    require: true
  },
  libraryDescription: {
    type: String,
    require: true
  },
  actions: [
    {
      actionName: String,
      keyCodes: [
        {
          keyCode: Number,
          keyName: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Shortcuts", ShortcutsSchema);
