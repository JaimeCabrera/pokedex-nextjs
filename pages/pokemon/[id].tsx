import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { getPokemonInfo, saveLocalFavorites } from "../../utils";
import confetti from "canvas-confetti";
import { useState } from "react";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail: NextPage<Props> = ({ pokemon }) => {
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
    <Layout title="Algun pokemon">
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
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await
  // your fetch function here
  // const { data } = await pokemonApi.get<PokemonListResponse>(
  //   "/pokemon?limit=151"
  // );

  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    // paths: [
    //   {
    //     params: {
    //       id: "1",
    //     },
    //   },
    // ],
    // fallback: "blocking",
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonDetail;
