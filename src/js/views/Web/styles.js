import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing } from "../../styles/layout";
import { orange, yellow } from "Styles/colors";

export const WebWrapperStyles = css`
  ${flexCenter};
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  overflow: hidden;
`;

export const TextWrapperStyles = css`
  text-align: right;
  width: 60%;
  min-height: 60%;
  position: relative;
  z-index: 5;
  @media screen and (max-width: 775px) {
    width: 100%;
    text-align: center;
  }
`;

export const WebTitleStyles = css`
  color: ${props => (props.id === props.active ? yellow : orange)};
`;

export const VideoWrapperStyles = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    -ms-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background-size: cover;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
