import React from "react";
import { Container, TextOverlay, Pushup } from "../styles/ComponentStyles";
import pushupMan from "../assets/Pushup man no bkgd.gif";

const LoadingComponent = ({ bottomRef }) => (
  <Container>
    <TextOverlay />
    <Pushup src={pushupMan} alt="Loading..." ref={bottomRef} />
  </Container>
);

export default LoadingComponent;
