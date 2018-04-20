import React from 'react';
import styled from "styled-components";
import {
  checkWrapStyles,
  checkerBoardStyles
} from "./styles";


const CheckWrap = styled.div`
  ${checkWrapStyles};
`;

const Checkers = styled.div`
  ${checkerBoardStyles}
`;

const Checkerboard = (props) => (
  <CheckWrap>
      <Checkers />
  </CheckWrap>
  )

export default Checkerboard;
