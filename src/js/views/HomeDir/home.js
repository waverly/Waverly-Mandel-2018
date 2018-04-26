import React from "react";
import styled from "styled-components";
import Checkerboard from "Components/Checkerboard";
import Scene from "Components/ThreeJS";
import {
  HomeWrapperStyles,
  HomeContentStyles,
  SubsectionStyles,
  SectionStyles
} from "./styles";
import { HashLink as Link } from "react-router-hash-link";

import { Switch, Route } from "react-router-dom";

const HomeWrapper = styled.div`
  ${HomeWrapperStyles};
`;

const HomeContent = styled.div`
  ${HomeContentStyles};
`;

const Subsection = styled.div`
  ${SubsectionStyles};
`;

const Section = styled.section`
  ${SectionStyles};
`;

const fullOpacity = {
  opacity: 1,
  transition: "1s all"
};

const noOpacity = {
  opacity: 0
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.commercialMouseOver = this.commercialMouseOver.bind(this);
    this.commercialMouseOut = this.commercialMouseOut.bind(this);
    this.personalMouseOver = this.personalMouseOver.bind(this);
    this.personalMouseOut = this.personalMouseOut.bind(this);
    this.state = {
      commercialExpanded: false,
      personalExpanded: false,
      mounted: true,
      textMounted: true
    };
  }

  commercialMouseOver() {
    this.setState(prevState => ({
      commercialExpanded: true
    }));
  }

  commercialMouseOut() {
    this.setState(prevState => ({
      commercialExpanded: false
    }));
  }

  personalMouseOver() {
    this.setState(prevState => ({
      personalExpanded: true
    }));
  }

  personalMouseOut() {
    this.setState(prevState => ({
      personalExpanded: false
    }));
  }

  componentDidMount() {
    // setTimeout(() => this.setState({ mounted: true }), 1000);
    // setTimeout(() => this.setState({ textMounted: true }), 2000);
  }

  componentWillUnmount() {
    // setTimeout(() => this.setState({ mounted: false }), 1500);
    // setTimeout(() => this.setState({ textMounted: false }), 1000);
  }

  render() {
    return (
      <HomeWrapper style={this.state.mounted ? fullOpacity : noOpacity}>
        <HomeContent style={this.state.textMounted ? fullOpacity : noOpacity}>
          <h1>Waverly Mandel</h1>

          <Section
            onMouseEnter={this.commercialMouseOver}
            onMouseLeave={this.commercialMouseOut}
          >
            <Link to={`/commercial`}>
              <h3>COMMERCIAL</h3>
            </Link>
            <Subsection expanded={this.state.commercialExpanded}>
              <Link to={`/commercial`}>
                <h4>Web Design & Interactive Development</h4>
              </Link>
            </Subsection>
          </Section>

          <Section
            onMouseEnter={this.personalMouseOver}
            onMouseLeave={this.personalMouseOut}
          >
            <Link to={`/personal`} onClick={this.handleClick}>
              <h3>PERSONAL</h3>
            </Link>
            <Subsection expanded={this.state.personalExpanded}>
              <Link
                smooth
                to="/personal#Interaction-Study"
                onClick={this.handleClick}
              >
                <h4>Interaction Studies</h4>
              </Link>
              <Link
                smooth
                to="/personal#User-Experience"
                onClick={this.handleClick}
              >
                <h4>User Experience</h4>
              </Link>
              <Link smooth to="/personal#Zines" onClick={this.handleClick}>
                <h4>Zines</h4>
              </Link>
              <Link
                smooth
                to="/personal#Support-Systems"
                onClick={this.handleClick}
              >
                <h4>Support Systems</h4>
              </Link>
              <Link
                smooth
                to="/personal#Body-Technique"
                onClick={this.handleClick}
              >
                <h4>Body Technique</h4>
              </Link>
            </Subsection>
          </Section>
        </HomeContent>
        <Scene />
        <Checkerboard />
      </HomeWrapper>
    );
  }
}

export default Home;
