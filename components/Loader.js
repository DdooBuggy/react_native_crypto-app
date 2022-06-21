import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BLACK_COLOR};
`;

const Loader = () => (
  <Container>
    <ActivityIndicator color="white" size="large" />
  </Container>
);

export default Loader;
