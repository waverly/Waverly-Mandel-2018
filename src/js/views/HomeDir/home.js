import React from "react";
import styled from "styled-components";
import Checkerboard from "Components/Checkerboard"
import Scene from 'Components/ThreeJS'
import { HomeWrapperStyles, HomeContentStyles } from "./styles";
import { Link } from 'react-router-dom'

import { Switch, Route } from "react-router-dom";

const HomeWrapper = styled.div`
  ${HomeWrapperStyles};
`;

const HomeContent = styled.div`
  ${HomeContentStyles};
`

const Home = (props: Props) => {
  return (
    <HomeWrapper>
      <HomeContent>
        <h1>Waverly Mandel</h1>
        <Link to={`/commercial`}>
          <h3>COMMERCIAL</h3>
        </Link>
        <Link to={`/personal`}>
          <h3>PERSONAL</h3>
        </Link>
      </HomeContent>
      <Scene/>
      <Checkerboard/>
    </HomeWrapper>
  );
};

export default Home;
