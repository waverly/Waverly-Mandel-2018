import React, { Component } from "react";
import styled from "styled-components";
import {
  WebWrapperStyles,
  TextWrapperStyles,
  VideoWrapperStyles
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

class Web extends React.Component {
  constructor() {
    super();
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      active: 2
    };
  }

  handleHover(i) {
    this.setState({ active: i });
    // console.log(activeUrl);
  }

  render() {
    // let activeUrl = "";
    // if (this.props.data[`${this.state.active}`]) {
    //   activeUrl = this.props.data[`${this.state.active}`].data.thumbnail.url;
    // }

    return (
      <WebWrapper>
        <TextWrapper>
          {this.props.data.map((item, index) => (
            <h2
              key={index}
              id={index}
              onMouseOver={() => this.handleHover(index)}
            >
              {item.data.title[0].text}
            </h2>
          ))}
        </TextWrapper>

        <VideoWrapper>
          <img
            src={
              this.props.data[`${this.state.active}`]
                ? this.props.data[`${this.state.active}`].data.thumbnail.url
                : ""
            }
            alt=""
          />
        </VideoWrapper>
      </WebWrapper>
    );
  }
}

export default Web;
