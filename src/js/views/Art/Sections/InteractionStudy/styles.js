import { css } from "styled-components";
// import { flexCenter, spacing } from "../../styles/layout";

export const ISStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  img {
    width: 33%;
  }

  @media screen and (max-width: 1000px) {
    padding-top: 10em;
    justify-content: center;
    img {
      width: 70%;
      margin: 2em 0;
    }
  }

  @media screen and (max-width: 775px) {
    padding-top: 10em;
    justify-content: center;
    img {
      width: 100%;
      margin: 1em 0;
    }
  }
`;
