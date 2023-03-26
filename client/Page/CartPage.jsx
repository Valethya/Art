import React from "react";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";
import Cart from "../components/Cart/Cart";
export default function CartPage({ handleClick, children }) {
  return (
    <>
      <NavBar />
      <Container>
        <Cart />
      </Container>
    </>
  );
}
