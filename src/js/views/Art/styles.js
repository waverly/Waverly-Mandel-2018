import { css } from "styled-components";
// import { flexCenter, spacing } from "Styles/layout";
import { flexCenter, spacing } from "../../styles/layout";

export const ArtWrapperStyles = css`
  ${flexCenter};
  min-height: 100vh;
`;

export const SectionStyles = css`
  ${flexCenter};
  flex-direction: column;
  min-height: 100vh;
  padding: ${spacing.double};
  position: relative;
`;

export const TitleStyles = css`
  position: absolute;
  bottom: 0;
  left: ${spacing.double};
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
