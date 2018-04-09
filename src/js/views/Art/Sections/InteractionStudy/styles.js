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
    justify-content: center;
    img {
      width: 80%;
    }
  }
`;
