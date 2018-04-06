import React, { Component } from "react";
import Prismic from "prismic-javascript";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import "Styles/home.scss";
import Coming from "Components/coming/Coming";
import Soon from "Components/coming/Soon";
import CV from "Static/YasminaKahnCV.pdf";

import { Switch, Route } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.comingEnter = this.comingEnter.bind(this);
    this.soonEnter = this.soonEnter.bind(this);
    this.state = {
      comingActive: true,
      soonActive: false
    };
  }

  comingEnter() {
    console.log("coming enter");
    this.setState(prevState => ({
      comingActive: !prevState.comingActive,
      soonActive: !prevState.soonActive
    }));
  }

  soonEnter() {
    console.log("soon enter");
    this.setState(prevState => ({
      soonActive: !prevState.soonActive,
      comingActive: !prevState.comingActive
    }));
  }

  render() {
    return (
      <div className="home-wrap">
        <a href={CV} onMouseEnter={this.comingEnter} target="_blank">
          <div className="left">
            <Coming active={this.state.comingActive} />
          </div>
        </a>
        <a
          href="http://www.instagram.com/current_archive"
          onMouseEnter={this.soonEnter}
          target="_blank"
        >
          <div className="right">
            <Soon active={this.state.soonActive} />
          </div>
        </a>
      </div>
    );
  }
}

export default Home;
