import React, { Component } from "react";
import styled from "styled-components";
import { WebWrapperStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const WebWrapper = styled.div`
  ${WebWrapperStyles};
`;

const Web = (props: Props) => {
  return (
    <WebWrapper>
      <h1>Web</h1>
    </WebWrapper>
  );
};

export default Web;
