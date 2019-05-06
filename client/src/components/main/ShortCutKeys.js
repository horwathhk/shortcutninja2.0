import React, { Component } from "react";

export default class ShortCutKeys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortcuts: [{ pentool: 60 }, { brushtool: 61 }, { magicwand: 62 }]
    };
  }
  sendShortcut() {
    let { shortcuts } = this.state;
    let shortcut = shortcuts[Math.floor(Math.random() * shortcuts.length)];
    console.log(shortcut);
    this.props.getShortCutKey(shortcut);
  }
  render() {
    return <div />;
  }
}
