import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { Nofavorites, PokemonFavorites } from "../../components/ui";
import { saveLocalFavorites } from "../../utils";

const Favorites: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(saveLocalFavorites.pokemons);
  }, []);

  return (
    <Layout title="Favorites">
      {favoritePokemons.length === 0 ? (
        <Nofavorites />
      ) : (
        <PokemonFavorites pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default Favorites;
