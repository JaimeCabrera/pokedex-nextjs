import { Container, Image, Text } from "@nextui-org/react";
import React from "react";

export const Nofavorites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "row",
        height: "calc(100vh -100px)",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h1>No hay pokemons favoritos</Text>
      <Image
        src="https://media.giphy.com/media/3o7btLwXyvQZqQqQiQ/giphy.gif"
        alt="pokemon"
      />
    </Container>
  );
};
