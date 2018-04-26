import { css } from "styled-components";
import { flexCenter, spacing } from "Styles/layout";

export const VideoBgStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
`;

export const ImgWrapStyles = css`
  max-width: 60%;
  margin: 2em;

  img {
    width: 100%;
  }

  @media screen and (max-width: 1000px) {
    max-width: 80%;
  }

  @media screen and (max-width: 775px) {
    max-width: 100%;
    margin: 2em 0;
  }
`;

export const TextWrapStyles = css`
  display: block;
  position: relative;
  text-align: center;

  h3 {
    margin: 0.5em 0;
  }

  a {
    font-weight: 800;
    border-bottom: 1px solid;
  }

  @media screen and (max-width: 1000px) {
  }
`;
