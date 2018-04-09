import React, { Component } from "react";
import styled from "styled-components";
import InteractionStudy from "./Sections/InteractionStudy";
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
    return (
      <ArtWrapper>
        <InteractionStudy data={ISData} />
      </ArtWrapper>
    );
  } else return "Loading...";
};

export default Art;
