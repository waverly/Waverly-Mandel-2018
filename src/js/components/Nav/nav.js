import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  NavWrapperStyles,
  NavListStyles,
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
      <NavWrapper expanded={this.state.expanded}>
        <ExpandedNav expanded={this.state.expanded}>
          <NavList>
            <Link to={`/commercial`} onClick={this.handleClick}>
              <NavBlock>
                <h2>Commercial</h2>
                <h3>Web Design and Interactive Development</h3>
              </NavBlock>
            </Link>
            <Link to={`/personal`} onClick={this.handleClick}>
              <NavBlock>
                <h2>Personal</h2>
                <h3>Interaction Studies</h3>
                <h3>Body Technique</h3>
                <h3>User Experience</h3>
              </NavBlock>
            </Link>
          </NavList>
        </ExpandedNav>
        <Header>
          <Link to={`/`}>
            <h1>Waverly Mandel</h1>
          </Link>

          <IconWrapper onClick={this.handleClick}>
            <CircleOne />
            <CircleTwo s />
          </IconWrapper>
        </Header>
      </NavWrapper>
    );
  }
}

export default Nav;
