import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Container from "../components/Container/Container";
import CardContainer from "../components/Container/CardContainer";

export default function FramePage() {
  return (
    <>
      <NavBar />
      <Container>
        <CardContainer />
      </Container>
    </>
  );
}
