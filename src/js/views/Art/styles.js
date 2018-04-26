import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing } from "../../styles/layout";

export const invisibleTitleStyles = {
  // transform: "translateX(-900px)",
  opacity: 0,
  transition: "1s all"
};

export const visibleTitleStyles = {
  // transform: "translateX(0px)",
  opacity: 1,
  transition: "1s all"
};

export const ArtWrapperStyles = css`
  ${flexCenter};
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const SectionStyles = css`
  ${flexCenter};
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  position: relative;
  width: 100vw;
  margin: ${spacing.double} 0;
  @media screen and (max-width: 1000px) {
  }
`;

export const TitleStyles = css`
  position: fixed;
  top: 80px;
  left: 25px;
  z-index: 15;
  p {
    display: inherit;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
    text-align: center;
    left: 0;
    padding: 0 1em;
  }
`;

export const ISStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  img {
    width: 33%;
  }

  @media screen and (max-width: 1000px) {
    img {
      width: 80%;
    }
  }
`;
