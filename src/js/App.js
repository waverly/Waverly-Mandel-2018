import React, { Component } from "react";
import Prismic from "prismic-javascript";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import Nav from "Components/Nav";
import Home from "Views/HomeDir";
import Art from "Views/Art";
import Web from "Views/Web/index.js";

import "./styles/global";

import { Switch, Route } from "react-router-dom";

const apiEndpoint = "https://waverly.prismic.io/api/v2";

class App extends Component {
  constructor() {
    super();
    this.addData = this.addData.bind(this);

    this.state = {
      art: [],
      web: []
    };
  }

  addData(items) {
    const art = items.filter(i => i.type === "art");
    const web = items.filter(i => i.type === "web");
    this.setState({ art, web });
  }

  componentDidMount() {
    Prismic.api(apiEndpoint).then(api => {
      api.query().then(response => {
        // console.log(response); // response is the response object, response.results holds the documents
        // console.log(response.results);
        this.addData(response.results);
      });
    });

    // for now - remove ordering
    // Prismic.api(apiEndpoint).then(api => {
    //   api
    //     .query(Prismic.Predicates.at("document.type", "web"))
    //     .then(response => {
    //       console.log(response); // response is the response object, response.results holds the documents
    //       console.log(response.results);
    //       this.addData(response.results);
    //     });
    // });
    // end of api
  }

  render() {
    return (
      <div className="router-ex">
        <Route
          render={({ location }) => (
            <div key={location.pathname}>
              {/* this feature was making nav buggy */}
              {/* <ReactCSSTransitionReplace
                transitionName="fade"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
              > */}
              <Nav path="/" location={location} />
              <Switch location={location}>
                <Route exact path="/" render={props => <Home />} />
                <Route
                  exact
                  path="/personal"
                  render={props => <Art data={this.state.art} />}
                />
                <Route
                  exact
                  path="/commercial"
                  render={props => <Web data={this.state.web} />}
                />
              </Switch>
              {/* </ReactCSSTransitionReplace> */}
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
