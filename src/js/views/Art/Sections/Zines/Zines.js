import React, { Component } from "react";
import styled from "styled-components";
import {
  SectionStyles,
  TitleStyles,
  invisibleTitleStyles,
  visibleTitleStyles
} from "../../styles.js";
import { VideoBgStyles, TextWrapStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const Section = styled.div`
  ${SectionStyles};
`;

const VideoBg = styled.div`
  ${VideoBgStyles};
`;

const TextWrap = styled.div`
  ${TextWrapStyles};
`;

const Title = styled.div`
  ${TitleStyles};
`;

class Zines extends React.Component {
  constructor() {
    super();
    this.handleHover = this.handleHover.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      active: 0,
      visible: false
    };
  }

  handleHover(i) {
    console.log("inside handle hover");

    this.setState({ active: i });
  }

  onChange(isVisible) {
    console.log("zines is now %s", isVisible ? "visible" : "hidden");
    this.setState({
      visible: isVisible ? true : false
    });
  }

  render() {
    const VisibilitySensor = require("react-visibility-sensor");

    if (this.props.data[0]) {
      let stem = this.props.data[0].data;
      return (
        <Section id="Zines">
          <VisibilitySensor onChange={this.onChange} />
          <Title
            style={
              this.state.visible ? visibleTitleStyles : invisibleTitleStyles
            }
          >
            <p>{stem.title[0].text}</p>
          </Title>
          <VideoBg>
            <video
              width="100%"
              muted
              autoPlay
              src={stem.videos[`${this.state.active}`].video.url}
            />
          </VideoBg>
          <TextWrap>
            {stem.titles.map((item, index) => (
              <h2
                onClick={() => this.handleHover(index)}
                onMouseOver={() => this.handleHover(index)}
                key={index}
              >
                {item.title1[0].text}
              </h2>
            ))}
          </TextWrap>
        </Section>
      );
    } else return " ";
  }
}

export default Zines;
