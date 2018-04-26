import React, { Component } from "react";
import styled from "styled-components";
// why doesnt webpack filepath work?
import Nav from "Components/Nav";
import { findNextInArray } from "../../utils/data";
import {
  WebWrapperStyles,
  TextWrapperStyles,
  VideoWrapperStyles,
  WebTitleStyles
} from "./styles";

import { Switch, Route } from "react-router-dom";

const WebWrapper = styled.div`
  ${WebWrapperStyles};
`;

const TextWrapper = styled.div`
  ${TextWrapperStyles};
`;

const VideoWrapper = styled.div`
  ${VideoWrapperStyles};
`;

const WebTitle = styled.div`
  ${WebTitleStyles};
`;

const Subtitle = styled.h4``;

const GitHub = styled.h2`
  margin-top: 2em;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

const fullOpacity = {
  opacity: 1,
  transition: "1s all"
};

const noOpacity = {
  opacity: 0
};

class Web extends React.Component {
  constructor() {
    super();
    this.handleHover = this.handleHover.bind(this);
    this.activeMobile = this.activeMobile.bind(this);

    this.state = {
      active: 0,
      mounted: false
    };
  }

  activeMobile() {
    if (this.props.width != 0 && this.props.width < 775) {
      console.log("inside of the fx");
      let self = this;
      console.log(this.props.width);
      setInterval(function() {
        console.log("in set interval");
        let newActive;
        let active = self.state.active;
        if (active < self.props.data.length - 1) {
          newActive = active + 1;
        } else newActive = 0;
        self.setState({
          active: newActive
        });
      }, 5000);
    }
  }

  handleHover(i) {
    this.setState({ active: i });
  }

  componentWillUnmount() {}

  componentDidMount() {
    setTimeout(this.activeMobile, 2000);
  }

  render() {
    if (this.props.data[0]) {
      let stem = this.props.data;
      return (
        <WebWrapper
        // style={this.state.mounted ? fullOpacity : noOpacity}
        >
          <Nav />
          <TextWrapper>
            <a target="_blank" href="https://github.com/waverly">
              <GitHub>Github</GitHub>
            </a>
            {this.props.data.map((item, index) => (
              <a
                key={index}
                target="_blank"
                href={item.data.link[0] ? item.data.link[0].text : "#"}
              >
                <WebTitle
                  id={index}
                  onMouseOver={() => this.handleHover(index)}
                  active={this.state.active}
                >
                  <h2>{item.data.title[0].text}</h2>
                  <h4>
                    {item.data.tagline[0] ? item.data.tagline[0].text : " "}
                  </h4>
                </WebTitle>
              </a>
            ))}
          </TextWrapper>
          <Overlay />
          <VideoWrapper>
            <video
              width="100%"
              muted
              loop
              autoPlay
              src={stem[`${this.state.active}`].data.video.url}
            />
          </VideoWrapper>
        </WebWrapper>
      );
    } else return " ";
  }
}

export default Web;
