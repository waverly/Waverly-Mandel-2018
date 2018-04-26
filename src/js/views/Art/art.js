import React, { Component } from "react";
import styled from "styled-components";
// import IntersectionVisible from "react-intersection-visible";
import InteractionStudy from "./Sections/InteractionStudy";
import UserExperience from "./Sections/UserExperience";
import Zines from "./Sections/Zines";
import SupportSystems from "./Sections/SupportSystems";
import BodyTechnique from "./Sections/BodyTechnique";
import Nav from "Components/Nav";

import {
  ArtWrapperStyles,
  SectionStyles,
  ISStyles,
  TitleStyles
} from "./styles";

import { Switch, Route } from "react-router-dom";

const ArtWrapper = styled.div`
  ${ArtWrapperStyles};
`;

class Art extends React.Component {
  constructor(props) {
    super(props);
    // this.onHide = this.onHide.bind(this);
    // this.onShow = this.onShow.bind(this);
    // this.onIntersect = this.onIntersect.bind(this);
  }
  //
  // onHide(entries) {
  //   console.log("hidden");
  // }
  //
  // onShow(entries) {
  //   console.log("showing");
  // }
  //
  // onIntersect(entries) {
  //   console.log("intersecting");
  // }

  componentDidMount() {}

  render() {
    var VisibilitySensor = require("react-visibility-sensor");
    if (this.props.data) {
      let ISData = this.props.data.filter(i => i.uid === "interaction-study");
      let UXData = this.props.data.filter(i => i.uid === "user-experience");
      let ZineData = this.props.data.filter(i => i.uid === "zines");
      let SSData = this.props.data.filter(i => i.uid === "support-systems");
      let BTData = this.props.data.filter(i => i.uid === "body-technique");

      return (
        <ArtWrapper ref="container">
          <Nav />
          <InteractionStudy data={ISData} />
          <UserExperience data={UXData} />
          <Zines data={ZineData} ref="zines" />
          <SupportSystems data={SSData} />
          <BodyTechnique data={BTData} />
        </ArtWrapper>
      );
    } else return " ";
  }
}

export default Art;
