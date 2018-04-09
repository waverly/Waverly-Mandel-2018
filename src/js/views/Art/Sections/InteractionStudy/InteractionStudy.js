import React, { Component } from "react";
import styled from "styled-components";
import { SectionStyles, TitleStyles } from "../../styles.js";
import { ISStyles } from "./styles";

import { Switch, Route } from "react-router-dom";

const Section = styled.div`
  ${SectionStyles};
`;

const Wrap = styled.div`
  ${ISStyles};
`;

const Title = styled.div`
  ${TitleStyles};
`;

const InteractionStudy = (props: Props) => {
  if (props.data[0]) {
    let stem = props.data[0].data;
    console.log(stem);
    return (
      <Section>
        <Wrap>
          {stem
            ? stem.images.map((item, index) => (
                <img key={index} src={item.image.url} alt="" />
              ))
            : " "}
        </Wrap>
        <Title>
          <p>{stem.title["0"].text}</p>
        </Title>
      </Section>
    );
  } else return "Loading...";
};

export default InteractionStudy;
