import React, { Component } from "react";
import styled from "styled-components";
import InteractionStudy from "./Sections/InteractionStudy";
import UserExperience from "./Sections/UserExperience";
import Zines from "./Sections/Zines";
import SupportSystems from "./Sections/SupportSystems";
import BodyTechnique from "./Sections/BodyTechnique";
import Nav from 'Components/Nav'

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

const Art = (props: Props) => {
  if (props.data) {
    let ISData = props.data.filter(i => i.uid === "interaction-study");
    let UXData = props.data.filter(i => i.uid === "user-experience");
    let ZineData = props.data.filter(i => i.uid === "zines");
    let SSData = props.data.filter(i => i.uid === "support-systems");
    let BTData = props.data.filter(i => i.uid === "body-technique");
    return (
      <ArtWrapper>
        <Nav/>
        <InteractionStudy data={ISData} />
        <UserExperience data={UXData} />
        <Zines data={ZineData} />
        <SupportSystems data={SSData} />
        <BodyTechnique data={BTData} />
      </ArtWrapper>
    );
  } else return "Loading...";
};

export default Art;
