import { css } from "styled-components";
import { flexCenter, spacing } from "Styles/layout";

export const ContentWrapperStyles = css`
  ${flexCenter};
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  line-height: 22px;

  img {
    max-width: 80%;
    align-self: center;
    position: absolute;
  }

  @media screen and (max-width: 775px) {
    div {
      img {
        max-width: 100%;
      }
    }
  }
`;

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
  @media screen and (max-width: 1000px) {
  }
`;

export const TextWrapStyles = css`
  display: block;
  position: relative;
  text-align: center;

  @media screen and (max-width: 1000px) {
  }
`;
