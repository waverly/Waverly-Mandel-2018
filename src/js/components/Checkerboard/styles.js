import { css, keyframes } from "styled-components";
import { flexCenter, spacing, headerHeight } from "../../styles/layout";
import { orange, yellow } from "../../styles/colors";

const $pink = "#FCFFED"
const $deepPurple = "#E6FFD6"
const $orange = "#F86738"


const moveBackground = keyframes`
  to{
    background-position: 0 100px, 50px 150px
  }`

export const checkWrapStyles = css`
  height: 100vh;
  width: 100vw;
  top: 0;
  position: fixed;
  z-index: 1;
  background: ${$pink};
  overflow: hidden;
  perspective: 600px;
`;

export const checkerBoardStyles = css`
  position: absolute;
  bottom: -30%;
  right: -60%;
  height: 150%;
  width: 200%;
  transform: rotateX(75deg);
  transform-origin: center center;
  transform-style: preserve-3d;
  background-color: ${$pink};
  background-size: 100px 100px;
  background-position: 0 0, 50px 50px;
  background-image: linear-gradient(45deg, ${$orange} 25%, transparent 25%, transparent 75%, ${$orange} 75%, ${$orange}), linear-gradient(45deg, ${$orange} 25%, transparent 25%, transparent 75%, ${$orange} 75%, ${$orange});
   -webkit-animation: ${moveBackground} 3s linear infinite;
           animation: ${moveBackground} 3s linear infinite;

  &:after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background-image: linear-gradient( ${$pink}, transparent);
  }
`
