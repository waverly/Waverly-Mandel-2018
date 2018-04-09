import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing } from "../../styles/layout";

export const WebWrapperStyles = css`
  ${flexCenter};
  height: 100vh;
  width: 100vw;
`;

export const TextWrapperStyles = css`
  text-align: right;
  width: 60%;
  height: 60%;
  position: relative;
  z-index: 5;
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

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
