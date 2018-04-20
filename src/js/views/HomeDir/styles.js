import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing } from "../../styles/layout";

export const HomeWrapperStyles = css`
  ${flexCenter};
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  h1{
    font-size: 42px;
  }
  h3{
    font-family: "Acumin-EL";
    font-size: 20px;
    font-weight: 300;
    margin: ${spacing.single} 0;
  }
`;

export const HomeContentStyles = css`
    z-index: 1000;
    position: fixed;
    top: ${spacing.double};
    left: ${spacing.double};
    text-align: left;
`
