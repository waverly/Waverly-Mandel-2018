import React, { Component } from "react";
import styled from "styled-components";
import {
  SectionStyles,
  TitleStyles,
  invisibleTitleStyles,
  visibleTitleStyles
} from "../../styles.js";
import { VideoBgStyles, TextWrapStyles, ImgWrapStyles } from "./styles";

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

const ImgWrap = styled.div`
  ${ImgWrapStyles};
`;

class BodyTechnique extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      active: 0,
      visible: false
    };
  }

  onChange(isVisible) {
    this.setState({
      visible: isVisible ? true : false
    });
  }

  render() {
    const VisibilitySensor = require("react-visibility-sensor");

    if (this.props.data[0]) {
      let stem = this.props.data[0].data;
      return (
        <Section id="Body-Technique">
          <VisibilitySensor onChange={this.onChange} />
          <Title
            style={
              this.state.visible ? visibleTitleStyles : invisibleTitleStyles
            }
          >
            <p>{stem.title[0].text}</p>
          </Title>
          <ImgWrap>
            <img src={stem.images[0].image.url} alt="" />
          </ImgWrap>
          <TextWrap>
            <h3>{stem.textblock[0].text}</h3>
            <h3>
              {stem.textblock2[0].text}{" "}
              <a href={stem.textblock2link.url} target="_blank">
                here
              </a>
            </h3>
          </TextWrap>
        </Section>
      );
    } else return " ";
  }
}

export default BodyTechnique;
