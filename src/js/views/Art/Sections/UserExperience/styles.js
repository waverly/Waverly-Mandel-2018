import { css } from "styled-components";
import { flexCenter, spacing } from "Styles/layout";

export const VideoWrapStyles = css`
  display: block;
  @media screen and (max-width: 1000px) {
  }
`;

export const ControlsWrapStyles = css`
  display: block;
  position: relative;
  margin-top: ${spacing.double};
  p {
    display: inline-block;
    margin: 0 0.5em;
  }

  @media screen and (max-width: 1000px) {
  }
`;
