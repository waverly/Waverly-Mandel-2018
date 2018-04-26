import React, { Component } from "react";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";
import Checkerboard from "Components/Checkerboard";
import {
  NavWrapperStyles,
  NavListStyles,
  NameStyles,
  ExpandedNavStyles,
  HeaderStyles,
  IconWrapperStyles,
  CircleOneStyles,
  CircleTwoStyles
} from "./styles";

import { Switch, Route } from "react-router-dom";

const NavWrapper = styled.div`
  ${NavWrapperStyles};
`;

const NavBlock = styled.div`
  margin: 25px 0;
`;

const ExpandedNav = styled.div`
  ${ExpandedNavStyles};
`;

const NavList = styled.div`
  ${NavListStyles};
`;

const Header = styled.div`
  ${HeaderStyles};
`;

const IconWrapper = styled.button`
  ${IconWrapperStyles};
`;

const CircleOne = styled.div`
  ${CircleOneStyles};
  ${IconWrapper}:hover & {
    margin-left: -17.5px;
    margin-right: 0;
  }
`;

const Name = styled.h1`
  ${NameStyles};
`;

const CircleTwo = styled.div`
  ${CircleTwoStyles};
  ${IconWrapper}:hover & {
    margin-right: -7.5px;
  }
`;

class Nav extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      expanded: false
    };
  }

  // method to toggle state onClick

  handleClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    return (
      <NavWrapper>
        <Header>
          <Link to={`/`}>
            <Name>Waverly Mandel</Name>
          </Link>
          <Link to={`/`}>
            <IconWrapper onClick={this.handleClick}>
              <CircleOne expanded={this.state.expanded} />
              <CircleTwo expanded={this.state.expanded} />
            </IconWrapper>
          </Link>
        </Header>
      </NavWrapper>
    );
  }
}

export default Nav;
