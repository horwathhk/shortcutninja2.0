import React, { Component } from "react";
import { Power2, TweenLite } from "gsap";
import "./Scroll.css";
import { TimelineLite } from "gsap"; // import TimelineLite instead
import StarWarz from "../../images/starwarz.png";
import Starwars from "../../images/starwars.jpg";
import ShortCutDisplay from "./ShortCutDisplay";
import Scoreboard from "./Scoreboard";
import Pixelz from "../../images/pixelz.jpg";
import { Query } from "react-apollo";
import { getCurrentLibraryQuery } from "../../queries/queries";
import { graphql, compose } from "react-apollo";
import Ninja from "../../images/Ninja.png.png";
//reference
//https://medium.com/dev-red/tutorial-animate-the-opening-star-wars-crawl-in-a-react-app-with-greensock-bc55a5d05d24

let keyMap = [];
let keyNameMap = [];

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libaryName: null,
      playerReady: false,
      keyPressedKey: [],
      keyPressedName: null,
      shortCutKey: [],
      shortCutName: "",
      shortcuts: [],
      success: false,
      failure: false,
      displayText: true,
      showStartButton: true,
      showShortcut: false,
      propToggle: false,
      scoreCounter: 0
    };
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.getCurrentLibraryQuery.getCurrentLibrary !==
      prevProps.getCurrentLibraryQuery.getCurrentLibrary
    ) {
      console.log(this.props.getCurrentLibrary);
      if (this.props) {
        console.log(this.props.getCurrentLibraryQuery.getCurrentLibrary);
        if (this.props.getCurrentLibraryQuery.getCurrentLibrary) {
          let all = this.props.getCurrentLibraryQuery.getCurrentLibrary;
          this.setState({
            shortcuts: all.actions,
            libraryName: this.props.LibraryName
          });
        }
      }
    }
  };

  startGame = e => {
    e.preventDefault();
    let { playerReady } = this.state;

    this.setState({
      playerReady: true,
      showStartButton: false,
      showShortcut: true
    });
  };

  //Get the Current Shortcut From ShortCut Display
  getShortcut = shortcut => {
    console.log(shortcut);
    this.setState(
      { shortCutKey: shortcut.keyCodes, shortCutName: shortcut.actionName },
      function() {
        let { shortCutKey } = this.state;
      }
    );
  };

  //Get each Keypress from ShortCut Display

  getKeyPressed = keyPressed => {
    console.log(keyPressed);
    this.setState({ keyPressedKey: keyPressed }, function() {
      console.log("state in keyPRessed!!");
      console.log(this.state.keyPressedKey);
      this.checkAnswer();
    });
  };

  //Check Answer
  checkAnswer = () => {
    console.log("****Check Answer FUNCTION****");
    let { keyPressedKey, shortCutKey } = this.state;
    let showSuccessMessage = null;
    let showFailureMessage = null;
    let i;
    console.log(shortCutKey);
    console.log(keyPressedKey);
    if (keyPressedKey.length > 0) {
      console.log(keyPressedKey);
      for (i = 0; i < shortCutKey.length; ++i) {
        if (keyPressedKey[i] === shortCutKey[i]) {
          showSuccessMessage = true;
        } else {
          showFailureMessage = true;
        }
      }
      if (i === shortCutKey.length) {
        if (showFailureMessage === true) {
          this.showFailureMessage();
        } else if (showSuccessMessage === true) {
          this.showSuccessMessage();
        }
      }
    }
  };

  showSuccessMessage() {
    let {
      shortCutKey,
      success,
      failure,
      displayText,
      playerReady,
      propToggle
    } = this.state;
    this.setState(
      {
        success: true,
        propToggle: !propToggle,
        displayText: false
      },
      function() {
        this.setState(prevState => {
          return { scoreCounter: prevState.scoreCounter + 1 };
        });
        setTimeout(() => {
          this.setState({
            success: false,
            failure: null,
            displayText: true,
            keyPressedKey: []
          });
        }, 1000);
        return (keyMap = []);
      }
    );
  }

  showFailureMessage() {
    let { shortCutKey, success, failure, displayText, propToggle } = this.state;
    this.setState(
      {
        failure: true,
        displayText: false,
        propToggle: !propToggle
      },
      function() {
        setTimeout(() => {
          this.setState({
            failure: null,
            displayText: true,
            scoreCounter: null,
            keyPressedKey: []
          });
        }, 3000);
        return (keyMap = []);
      }
    );
  }

  render() {
    let {
      playerReady,
      shortCutKey,
      shortCutName,
      success,
      failure,
      displayText,
      showStartButton,
      showShortcut,
      propToggle,
      scoreCounter,
      libraryName
    } = this.state;
    let content;
    let message;
    console.log(this.props.libraryName);

    if (success === true) {
      content = (
        <h1 style={{ marginTop: "20%" }} className="text-center">
          <i
            style={{ color: "green" }}
            class="fa fa-check"
            aria-hidden="true"
          />{" "}
          Correct!
        </h1>
      );
    } else if (failure === true && success === false) {
      content = (
        <div>
          <h1 style={{ marginTop: "20%" }} className="text-center">
            <i
              style={{ color: "red" }}
              class="fa fa-times"
              aria-hidden="true"
            />
            Wrong! The shortcut for the {shortCutName} is:
            <br /> {shortCutKey[0]} + {""}
            {shortCutKey[1]}
          </h1>
          <h4 class="text-muted text-center">
            You got {scoreCounter} answers correct in a row!
          </h4>
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "2%" }} className="container">
        <div className="row">
          <div className="col" />
          {this.props.libraryName ? (
            <div className="col">
              {showStartButton ? (
                <button
                  className="start-btn"
                  style={{
                    fontSize: "35pt",
                    marginTop: "30%",
                    marginleft: "70%"
                  }}
                  onClick={this.startGame}
                >
                  CLICK TO START
                </button>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div class="col-sm" />
                <div class="col-6">
                  <img
                    class="card-img"
                    style={{
                      height: "100%",
                      width: "100%",
                      marginTop: "5%",
                      opacity: ".2"
                    }}
                    src={Ninja}
                    alt="Card image"
                  />
                  {/* <div class="card-img-overlay">
                    <h3 class="card-title  text-white">Card title</h3>
                    <p class="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p class="card-text">Last updated 3 mins ago</p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div> */}
                </div>
                <div class="col-sm" />
              </div>
            </div>
          )}

          <div className="col" />
        </div>
        <div>
          {showShortcut ? (
            <div>
              <div class="row">
                <div class="col-8" />
                <div class="col-4">
                  <Scoreboard scoreCounter={scoreCounter} />
                </div>
              </div>

              <section className="crawl">
                <ShortCutDisplay
                  getShortcut={this.getShortcut}
                  playerReady={playerReady}
                  getKeyPressed={this.getKeyPressed}
                  propToggle={propToggle}
                  libraryName={this.props.libraryName}
                  shortcuts={this.state.shortcuts}
                />
                <div>{content}</div>
                <div>
                  {displayText ? (
                    <div className="marquee  text-center">
                      <h1 className="title">{shortCutName}</h1>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getCurrentLibraryQuery, { name: "getCurrentLibraryQuery" })
)(Scroll);
