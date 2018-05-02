import React, { Component } from "react";
import styled from "styled-components";
// why doesnt webpack filepath work?
import Nav from "Components/Nav";
import { findNextInArray } from "../../utils/data";
import {
  WebWrapperStyles,
  TextWrapperStyles,
  VideoWrapperStyles,
  WebTitleStyles
} from "./styles";

import { Switch, Route } from "react-router-dom";

class Video extends React.Component {
  render() {
    return (
      <video id="background-video" muted controls playsInline loop autoPlay>
        <source
          src="https://prismic-io.s3.amazonaws.com/waverly%2F33a3dd2c-44fe-4a5f-b76f-604d9caca2f8_anne-alexander.webm"
          type="video/webm"
        />
        <source src="https://prismic-io.s3.amazonaws.com/waverly%2Fea0b9527-0328-47c7-9dfa-0e6af5f253a2_anne-alexander.mov" />
        <source
          src="https://prismic-io.s3.amazonaws.com/waverly%2F6b6bc311-8197-430c-abc4-0f0fc9fe896b_anne-alexander.mp4"
          type="video/mp4"
        />
        <source
          src="https://prismic-io.s3.amazonaws.com/waverly%2F33a3dd2c-44fe-4a5f-b76f-604d9caca2f8_anne-alexander.webm"
          type="video/webm"
        />
        {/* <source
          src="https://prismic-io.s3.amazonaws.com/waverly%2F867ef138-ddd7-4539-8b4b-c82455e99381_big_buck_bunny_720p_1mb+%281%29.mp4"
          type="video/webm"
        /> */}
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default Video;
