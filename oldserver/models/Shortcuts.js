const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const ShortcutsSchema = new Schema({
  keyName: {
    type: String,
    require: true
  },
  keyCode: {
    type: Number,
    required: true
  }
});

module.exports = Shortcut = mongoose.model("shortcut", ShortcutsSchema);
