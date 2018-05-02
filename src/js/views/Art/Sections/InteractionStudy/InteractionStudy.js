import React, { Component } from "react";
import styled from "styled-components";
import {
  SectionStyles,
  TitleStyles,
  invisibleTitleStyles,
  visibleTitleStyles
} from "../../styles.js";
import { ISStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const Section = styled.div`
  ${SectionStyles};
`;

const Wrap = styled.div`
  ${ISStyles};
`;

const Title = styled.div`
  ${TitleStyles};
`;

class InteractionStudy extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.state = {
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
        <Section id="Interaction-Study">
          <VisibilitySensor onChange={this.onChange} />
          <Title
            style={
              this.state.visible ? visibleTitleStyles : invisibleTitleStyles
            }
          >
            <p>{stem.title["0"].text}</p>
          </Title>
          <Wrap>
            {stem
              ? stem.images.map((item, index) => (
                  <img key={index} src={item.image.url} alt="" />
                ))
              : " "}
          </Wrap>
        </Section>
      );
    } else return " ";
  }
}

export default InteractionStudy;
