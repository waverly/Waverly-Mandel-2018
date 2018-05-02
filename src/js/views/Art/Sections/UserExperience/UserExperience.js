import React, { Component } from "react";
import styled from "styled-components";
import {
  SectionStyles,
  TitleStyles,
  invisibleTitleStyles,
  visibleTitleStyles
} from "../../styles.js";
import { VideoWrapStyles, ControlsWrapStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const Section = styled.div`
  ${SectionStyles};
`;

const VideoWrap = styled.div`
  ${VideoWrapStyles};
  video {
    min-height: 200px;
  }
`;

const ControlsWrap = styled.div`
  ${ControlsWrapStyles};
`;

const Title = styled.div`
  ${TitleStyles};
`;

class UserExperience extends React.Component {
  constructor() {
    super();
    this.handleHover = this.handleHover.bind(this);
    this.onChange = this.onChange.bind(this);
    this.partiallyVisible = this.partiallyVisible.bind(this);
    this.state = {
      active: 0,
      visible: false
    };
  }

  handleHover(i) {
    this.setState({ active: i });
  }

  onChange(isVisible) {
    this.setState({
      visible: isVisible ? true : false
    });
  }

  partiallyVisible(isVisible) {
    console.log("top is visible");
  }

  render() {
    const VisibilitySensor = require("react-visibility-sensor");

    if (this.props.data[0]) {
      let stem = this.props.data[0].data;
      return (
        <Section id="User-Experience">
          <VisibilitySensor
            onChange={this.onChange}
            // partiallyVisible={this.partiallyVisible}
          />
          <Title
            style={
              this.state.visible ? visibleTitleStyles : invisibleTitleStyles
            }
          >
            <p>{stem.title[0].text}</p>
          </Title>
          <VideoWrap>
            <video
              width="100%"
              muted
              autoPlay
              playsInline
              src={stem.videos[`${this.state.active}`].video.url}
            />
          </VideoWrap>
          <ControlsWrap>
            {stem.videos.map((item, index) => (
              <p
                onClick={() => this.handleHover(index)}
                onMouseOver={() => this.handleHover(index)}
                key={index}
              >
                {index + 1}
              </p>
            ))}
          </ControlsWrap>
        </Section>
      );
    } else return " ";
  }
}

export default UserExperience;
