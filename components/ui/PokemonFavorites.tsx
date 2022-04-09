import { Grid } from "@nextui-org/react";
import React, { FC } from "react";
import { FavoriteCardItem } from "./";

interface Props {
  pokemons: number[];
}

export const PokemonFavorites: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify="flex-start" direction="row">
      {pokemons.map((e) => {
        return <FavoriteCardItem key={e.toString()} pokemonId={e} />;
      })}
    </Grid.Container>
  );
};
