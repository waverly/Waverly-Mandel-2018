import React, { Component } from "react";
import Prismic from "prismic-javascript";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Nav from "Components/Nav";
import Home from "Views/HomeDir";
import Art from "Views/Art";
import Web from "Views/Web/index.js";
import Video from "Views/Video/index.js";

import "./styles/global";

import { Switch, Route } from "react-router-dom";

const apiEndpoint = "https://waverly.prismic.io/api/v2";

class App extends Component {
  constructor() {
    super();
    this.addData = this.addData.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      art: [],
      web: [],
      width: 0,
      height: 0
    };
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  addData(items) {
    const newArt = items.filter(i => i.type === "art");
    const newWeb = items.filter(i => i.type === "web");
    let art = [...this.state.art];
    let web = [...this.state.web];
    newArt.forEach(n => art.push(n));
    newWeb.forEach(n => web.push(n));

    this.setState({ art, web });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    Prismic.api(apiEndpoint).then(api => {
      api
        .query(Prismic.Predicates.at("document.type", "web"), {
          orderings: "[my.web.title]"
        })
        .then(response => {
          this.addData(response.results);
        });
    });

    Prismic.api(apiEndpoint).then(api => {
      api
        .query(Prismic.Predicates.at("document.type", "art"))
        .then(response => {
          this.addData(response.results);
        });
    });
  }

  render() {
    return (
      <div className="router-ex">
        <Route
          render={({ location }) => (
            <div key={location.pathname}>
              <Switch location={location}>
                <Route exact path="/" render={props => <Home />} />
                <Route
                  exact
                  path="/personal"
                  render={props => (
                    <Art data={this.state.art} width={this.state.width} />
                  )}
                />
                <Route
                  exact
                  path="/commercial"
                  render={props => (
                    <Web data={this.state.web} width={this.state.width} />
                  )}
                />
                <Route exact path="/video" render={props => <Video />} />
              </Switch>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
