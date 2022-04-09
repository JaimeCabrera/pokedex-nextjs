import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { pokemonApi } from "../../api";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { getPokemonInfo, saveLocalFavorites } from "../../utils";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonByName: NextPage<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(
    saveLocalFavorites.existInFavorites(pokemon.id)
  );
  const onToggleFavorite = () => {
    saveLocalFavorites.toggleFavorite(pokemon.id);
    setIsFavorite(!isFavorite);
    if (isFavorite) return;
    confetti({
      zIndex: 999,
      particleCount: 200,
      spread: 380,
      angle: -100,
      origin: {
        x: 0.5,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "2rem" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "3rem" }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || ""}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isFavorite}
                onClick={onToggleFavorite}
              >
                {isFavorite ? "En favoritos" : "Agregar a favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// generacion dinamica de todos los posibles resultados de los 151 nombres de pokemons
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // traer los 151 poekon y opbtener los nombres para las paginas staticas
  const { data } = await pokemonApi.get<PokemonListResponse>(
    "/pokemon?limit=151"
  );
  // filtrando la data para guardar solo lo que utilizo
  const pokemons151 = [...data.results].map((value, index) => value.name);
  return {
    paths: pokemons151.map((name) => ({ params: { name } })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};
export default PokemonByName;
