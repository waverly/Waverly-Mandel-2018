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

class BodyTechnique extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0
    };
  }

  render() {
    if (this.props.data[0]) {
      let stem = this.props.data[0].data;
      return (
        <Section>
          <h1>body tech placeholder</h1>
        </Section>
      );
    } else return "LOading...";
  }
}

export default BodyTechnique;
