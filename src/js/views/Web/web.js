import React, { Component } from "react";
import styled from "styled-components";
// why doesnt webpack filepath work?
import Nav from 'Components/Nav'
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

const WebTitle = styled.h2`
  ${WebTitleStyles};
`;

const GitHub = styled.h2`
  margin-top: 2em;
`;

class Web extends React.Component {
  constructor() {
    super();
    this.handleHover = this.handleHover.bind(this);

    this.state = {
      active: 0
    };
  }

  handleHover(i) {
    this.setState({ active: i });
  }

  componentDidMount() {
    // may need to refactor to get variable list length from self.props.data.length once' it's ensure that self.data has loaded
    if (this.props.width < 775) {
      let self = this;
      setInterval(function() {
        let newActive;
        let active = self.state.active;
        if (active < self.props.data.length - 1) {
          newActive = active + 1;
        } else newActive = 0;
        // console.log(self.props.data.length);
        // console.log(active, newActive);
        self.setState({
          active: newActive
        });
      }, 5000);
    }
  }

  render() {
    if (this.props.data[0]) {
      let stem = this.props.data;
      console.log(stem);
      return (
        <WebWrapper>
          <Nav/>
          <TextWrapper>
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
                  {item.data.title[0].text}
                </WebTitle>
              </a>
            ))}
            <a target="_blank" href="https://github.com/waverly">
              <GitHub>Github</GitHub>
            </a>
          </TextWrapper>

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
    } else return "Loading";
  }
}

export default Web;
