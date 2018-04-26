import { css } from "styled-components";
import { flexCenter, spacing } from "../../styles/layout";
import { orange, yellow, offwhite } from "../../styles/colors";

export const HomeWrapperStyles = css`
  ${flexCenter};
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 3s all;
  h1 {
    color: ${offwhite};
  }
  h3 {
    font-family: "Acumin-Medium";
    margin: ${spacing.single} 0;
    -webkit-margin-after: 0em;
    color: ${offwhite};
  }
  h4 {
    color: ${offwhite};
  }
`;

export const HomeContentStyles = css`
  z-index: 1000;
  position: fixed;
  top: ${spacing.double};
  left: ${spacing.double};
  text-align: left;
  @media screen and (max-width: 775px) {
    position: relative;
    text-align: center;
    top: 30px;
    left: 0;
    h1 {
      font-size: 60px;
      color: ${offwhite} !important;
    }
    h3 {
      font-size: 25px;
      line-height: 30px;
      color: ${offwhite} !important;
    }
  }
`;

export const SectionStyles = css`
  margin-bottom: ${spacing.single};
`;

export const SubsectionStyles = css`
  /*display: ${props => (props.expanded ? "block" : "none")}*/
  margin: 0em 0;
  /*height: ${props => (props.expanded ? "150px" : 0)};*/
  transition: 1s height;
  @media screen and (max-width: 775px) {
    display: none;
  }
`;
