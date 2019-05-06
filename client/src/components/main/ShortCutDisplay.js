import React, { Component } from "react";
import ShortCutKeys from "./ShortCutKeys";

let keyMap = [];

export default class ShortCutDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerReady: null,
      shortCut: null,
      shortcuts: [
        { keyCodes: "shift + d", shortCutName: [16, 68] },
        { keyCodes: "shift + g", shortCutName: [16, 71] },
        { keyCodes: "shift + x", shortCutName: [16, 88] }
      ],
      keyPressedKeys: []
    };
  }

  setKeyPressed = keyPressed => {
    let key = keyPressed.keyCode;
    console.log(keyPressed);
    keyMap.push(key);
  };

  setShortCutArrayState() {
    this.setState({ keyPressedKeys: keyMap }, function() {
      this.props.getKeyPressed(this.state.keyPressedKeys);
      this.resetAll();
    });
  }

  resetAll = () => {
    let emptyArray = [];
    keyMap = [];
    this.setState({ keyPressed: emptyArray });
    return keyMap;
  };

  componentDidUpdate = prevProps => {
    let { shortcuts, keyPressed } = this.state;
    if (this.props.propToggle !== prevProps.propToggle) {
      let shortcut = shortcuts[Math.floor(Math.random() * shortcuts.length)];
      this.props.getShortcut(shortcut);
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.setKeyPressed.bind(this));
    window.addEventListener("keyup", this.setShortCutArrayState.bind(this));
    let { shortcuts, keyPressed } = this.state;

    this.setState({ shortcuts: this.props.shortcuts }, function() {
      if (this.props.playerReady !== this.state.playerReady) {
        let newshortcut = this.state.shortcuts[
          Math.floor(Math.random() * shortcuts.length)
        ];

        this.props.getShortcut(newshortcut);
      }
    });
  }

  render() {
    return <div />;
  }
}
