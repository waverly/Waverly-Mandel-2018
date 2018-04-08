import React, { Component } from "react";
import styled from "styled-components";
import { ArtWrapperStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const ArtWrapper = styled.div`
  ${ArtWrapperStyles};
`;

const Art = (props: Props) => {
  return (
    <ArtWrapper>
      <h1>Art</h1>
    </ArtWrapper>
  );
};

export default Art;
