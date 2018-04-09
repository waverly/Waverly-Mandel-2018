import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing, headerHeight } from "../../styles/layout";
import { orange, yellow } from "../../styles/colors";

export const NavWrapperStyles = css`
  height: ${props => (props.expanded ? "100vh" : headerHeight)};
  padding: ${spacing.double};
`;

export const ExpandedNavStyles = css`
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: lightblue;
  visibility: ${props => (props.expanded ? "visible" : "hidden")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
`;

export const NavListStyles = css`
  width: 60%;
  text-align: right;
`;

export const HeaderStyles = css`
  ${flexCenter};
  justify-content: space-between;
  background-color: transparent;
  width: 100%;
  position: relative;
  z-index: 7;
`;

export const CircleOneStyles = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${orange};
  display: inline-block;
  margin-right: -15px;
  transition: all 800ms;
`;

export const CircleTwoStyles = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${orange};
  display: inline-block;
  margin-left: -15px;
  transition: all 800ms;
`;

export const IconWrapperStyles = css`
  display: block;
  background-color: transparent;
`;
