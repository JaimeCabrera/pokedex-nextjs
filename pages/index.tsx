import type { NextPage, GetStaticProps } from "next";

import { Grid } from "@nextui-org/react";

import { pokemonApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <>
        <Grid.Container gap={2} justify="flex-start">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </Grid.Container>
      </>
    </Layout>
  );
};

// esto es solo para paginas
// usar esto siemopre y cuando sepan que estos son los parametros que reciben
// yo se que en esta pagina voy ma mostar los 151 pokemon
// entonces genero los 151 pokemons
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokemonApi.get<PokemonListResponse>(
    "/pokemon?limit=151"
  );

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

  const pokemons: SmallPokemon[] = data.results.map((pokemon) => {
    // genrando el id
    const id = pokemon.url.split("/").reverse()[1];
    // generando la imagen
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    // retornando el pokemon con los datos adicionales
    return {
      ...pokemon,
      id,
      img,
    };
  });
  return {
    props: {
      pokemons,
    },
  };
};
export default HomePage;
