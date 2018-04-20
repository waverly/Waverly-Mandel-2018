import React, { Component } from "react";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";
import Checkerboard from "Components/Checkerboard"
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

            <NavBlock>
              <Link to={`/personal`} onClick={this.handleClick}>
                <h2>Personal</h2>
              </Link>
              <Link
                smooth
                to="/personal#Interaction-Study"
                onClick={this.handleClick}
              >
                <h3>Interaction Studies</h3>
              </Link>
              <Link
                smooth
                to="/personal#User-Experience"
                onClick={this.handleClick}
              >
                <h3>User Experience</h3>
              </Link>
              <Link smooth to="/personal#Zines" onClick={this.handleClick}>
                <h3>Zines</h3>
              </Link>
              <Link
                smooth
                to="/personal#Support-Systems"
                onClick={this.handleClick}
              >
                <h3>Support Systems</h3>
              </Link>
              <Link
                smooth
                to="/personal#Body-Technique"
                onClick={this.handleClick}
              >
                <h3>Body Technique</h3>
              </Link>
            </NavBlock>
          </NavList>
          <Checkerboard/>
        </ExpandedNav>
        <Header>
          <Link to={`/`}>
          <svg width="102.536px" height="55.58px" viewBox="0 0 102.536 55.58">
            <path d="M13.439-38.549"/>
            <polyline stroke="#F86738"points="12.992,11.413 20.689,41.351
            30.992,14.095 41.636,41.892 50.992,11.413 "/>
            <polyline stroke="#F86738" points="84.992,44.892 77.295,14.955 66.992,42.21
            56.348,14.413 46.992,44.892 "/>
          </svg>
          </Link>

          <IconWrapper onClick={this.handleClick}>
            <CircleOne expanded={this.state.expanded} />
            <CircleTwo expanded={this.state.expanded} />
          </IconWrapper>
        </Header>
      </NavWrapper>
    );
  }
}

export default Nav;
