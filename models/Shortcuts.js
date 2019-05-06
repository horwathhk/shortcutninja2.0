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
      keyCodes: [Number],
      keyNames: [String]
    }
  ]
});

// keyCodes:[
//   {
//     keyCode:Number
//     keyName:String
//   },
//   {
//     keyCode,
//     keyName
//   }
// ]

module.exports = mongoose.model("Shortcuts", ShortcutsSchema);
