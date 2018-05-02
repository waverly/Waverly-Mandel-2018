import { css } from "styled-components";
import { flexCenter, spacing } from "Styles/layout";
import { yellow } from "Styles/colors";

export const VideoBgStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  video {
    filter: grayscale(1) contrast(1.5);
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

  a {
    h2 {
      &:hover {
        color: ${yellow};
      }
    }
  }

  @media screen and (max-width: 1000px) {
  }
`;
