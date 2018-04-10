import React, { Component } from "react";
import styled from "styled-components";
import { SectionStyles, TitleStyles } from "../../styles.js";
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
    this.state = {
      active: 0
    };
  }

  handleHover(i) {
    this.setState({ active: i });
  }

  render() {
    if (this.props.data[0]) {
      let stem = this.props.data[0].data;
      return (
        <Section id="User-Experience">
          <VideoWrap>
            <video
              width="100%"
              muted
              autoPlay
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
          <Title>
            <p>{stem.title[0].text}</p>
          </Title>
        </Section>
      );
    } else return "LOading...";
  }
}

export default UserExperience;
