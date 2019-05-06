import React, { Component } from "react";
import ninja from "../../images/user-ninja-solid.svg";
export default class Scoreboard extends Component {
  render() {
    return (
      <div>
        <table class="scorecard">
          <thead />
          <tbody>
            <tr style={{ marginRight: "-20%" }}>
              <td style={{ fontWeight: "strong" }}>
                <i
                  style={{ color: "red" }}
                  class="fa fa-fire"
                  aria-hidden="true"
                />
                {""}
                Hot Streak:
              </td>
              <td>{this.props.scoreCounter}/14</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
