import { pokemonApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  // const { id } = params as { id: string };
  const { data } = await pokemonApi.get<Pokemon>(`/pokemon/${nameOrId}`);
  // filtrando solo la data que voy a usar en el json de las paginas stait

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};
