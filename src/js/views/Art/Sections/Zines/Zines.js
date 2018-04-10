import React, { Component } from "react";
import styled from "styled-components";
import { SectionStyles, TitleStyles } from "../../styles.js";
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
    this.state = {
      active: 0
    };
  }

  handleHover(i) {
    console.log("inside handle hover");
    this.setState({ active: i });
  }

  render() {
    if (this.props.data[0]) {
      let stem = this.props.data[0].data;
      return (
        <Section id="Zines">
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
          <Title>
            <p>{stem.title[0].text}</p>
          </Title>
        </Section>
      );
    } else return "LOading...";
  }
}

export default Zines;
