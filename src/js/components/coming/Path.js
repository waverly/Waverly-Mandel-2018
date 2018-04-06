import React, { Component } from "react";
import Prismic from "prismic-javascript";
import Snap from "snapsvg-cjs";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import "Styles/home.scss";
import { Switch, Route } from "react-router-dom";

const apiEndpoint = "https://patmartin.prismic.io/api/v2";

class Path extends Component {
  componentDidMount() {
    console.log(this.props.id);
    let id = "#" + this.props.id;
    let s = Snap(id);
    let path = this.props.path;
    let path2 = this.props.path2;

    var step1 = function() {
      s.animate({ d: path2 }, 8000, mina.backout, step2);
    };

    var step2 = function() {
      s.animate({ d: path }, 10000, mina.backinout, step1);
    };

    step1();
  }

  render() {
    // console.log(this.path);
    return <path id={this.props.id} d={this.props.path} />;
  }
}

export default Path;
