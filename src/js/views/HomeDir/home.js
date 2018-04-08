import React, { Component } from "react";
import styled from "styled-components";
import { HomeWrapperStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const HomeWrapper = styled.div`
  ${HomeWrapperStyles};
`;

const Home = (props: Props) => {
  return (
    <HomeWrapper>
      <h1>Home</h1>
    </HomeWrapper>
  );
};

export default Home;
