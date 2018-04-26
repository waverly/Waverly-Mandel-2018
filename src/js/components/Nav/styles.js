import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing, headerHeight } from "../../styles/layout";
import { orange, yellow } from "../../styles/colors";

export const NavWrapperStyles = css`
  height: headerHeight;
  position: relative;
  z-index: 6;
  svg {
    fill: transparent;
  }
`;

export const NameStyles = css`
  @media screen and (max-width: 775px) {
    display: none;
  }
`;

export const NavListStyles = css`
  width: 60%;
  text-align: left;
  position: fixed;
  top: 50px;
  left: ${spacing.double};
  z-index: 6;
`;

export const HeaderStyles = css`
  ${flexCenter};
  padding: ${spacing.double};
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  background-color: transparent;
  width: 100%;
  position: fixed;
  z-index: 7;
  @media screen and (max-width: 775px) {
    justify-content: center;
  }
`;

export const CircleOneStyles = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${orange};
  display: inline-block;
  margin-right: -15px;
  transition: all 800ms;
  margin-left: ${props => (props.expanded ? "-17.5px" : "0")};
  margin-right: ${props => (props.expanded ? "0px" : "-15px")};
`;

export const CircleTwoStyles = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${orange};
  display: inline-block;
  margin-left: -15px;
  transition: all 800ms;
  margin-right: ${props => (props.expanded ? "-7.5px" : "0")};
`;

export const IconWrapperStyles = css`
  display: block;
  background-color: transparent;
`;
