import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing } from "../../styles/layout";
import { orange, yellow, offwhite } from "Styles/colors";

export const WebWrapperStyles = css`
  ${flexCenter};
  height: 100vh;
  width: 100vw;
  position: relative;
  top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const TextWrapperStyles = css`
  text-align: right;
  width: 60%;
  top: 200px;
  min-height: 60%;
  position: relative;
  z-index: 5;
  margin-bottom: 4em;
  a {
    &:hover {
      h2 {
        color: ${yellow};
      }
    }
  }
  @media screen and (max-width: 775px) {
    width: 100%;
    top: 250px;
    padding: 10px;
    text-align: center;
  }
`;

export const WebTitleStyles = css`
  margin: 2em 0;
  h2,
  h4 {
    color: ${props => (props.id === props.active ? yellow : orange)};
  }
  &:hover {
    a,
    h2,
    h4 {
      color: ${yellow};
    }
  }
`;

export const VideoWrapperStyles = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;


  video {
    position: fixed;
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
  @media screen and (max-width: 775px)

  }
`;
