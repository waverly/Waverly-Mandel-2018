import React, { Component } from "react";
import Prismic from "prismic-javascript";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import Home from "Views/Home";
import "Styles/style.scss";

import { Switch, Route } from "react-router-dom";

const apiEndpoint = "https://patmartin.prismic.io/api/v2";

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="router-ex">
        <Route
          render={({ location }) => (
            <ReactCSSTransitionReplace
              transitionName="fade"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              <div key={location.pathname}>
                <Switch location={location}>
                  <Route exact path="/" render={props => <Home />} />
                </Switch>
              </div>
            </ReactCSSTransitionReplace>
          )}
        />
      </div>
    );
  }
}

export default App;
