import React, { Component } from "react";
import styled from "styled-components";
import {
  SectionStyles,
  TitleStyles,
  invisibleTitleStyles,
  visibleTitleStyles
} from "../../styles.js";
import { VideoBgStyles, TextWrapStyles, ContentWrapperStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const ContentWrapper = styled.div`
  ${ContentWrapperStyles};
`;

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

let index = 0;

const firstSlide = (
  <div>
    <h4>finite/infinite</h4>
    <h4>odd/even</h4>
    <h4>one/many</h4>
    <h4>right/left</h4>
    <h4>rest/motion</h4>
    <h4>straight/crookedness</h4>
    <h4>light/darkness</h4>
    <h4>good/evil</h4>
    <h4>square/oblong</h4>
    <h4>male/female</h4>
    <br />
    <h4 className="heavy">click through</h4>
  </div>
);

const Slide = props => {
  const { slide, active } = props;
  return (
    <img
      className="slide"
      src={props.image}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        transition: "opacity 0.5s",
        opacity: active ? "1" : "0"
      }}
    />
  );
};

class SupportSystems extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleCycle = this.handleCycle.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      active: 0,
      visible: false,
      activeEl: firstSlide,
      activeSlide: 0,
      slides: []
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data.length > 0) {
  //     nextProps.data[0].data.images.map(i =>
  //       this.state.slides.push(i.image.url)
  //     );
  //   }
  // }

  next() {
    const activeSlide =
      this.state.activeSlide === this.props.data[0].data.images.length - 1
        ? 0
        : this.state.activeSlide + 1;
    this.setState({
      activeSlide
    });
  }

  handleCycle() {
    if (index < 6) {
      index++;
    } else {
      index = 0;
    }
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
        <Section id="Support-Systems">
          <VisibilitySensor onChange={this.onChange} />
          <Title
            style={
              this.state.visible ? visibleTitleStyles : invisibleTitleStyles
            }
          >
            <p>{stem.title[0].text}</p>
          </Title>
          <ContentWrapper className="slideshow" onClick={this.next}>
            {stem.images.map((s, index) => {
              const currentSlide = stem.images[index].image.url;
              return (
                <Slide
                  key={stem.images[index].image.url}
                  image={currentSlide}
                  index={index}
                  active={index === this.state.activeSlide}
                />
              );
            })}
          </ContentWrapper>
        </Section>
      );
    } else return " ";
  }
}

export default SupportSystems;
