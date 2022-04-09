const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  // fruncion ´para agregar o quitar el pokemon de favoritos
  if (favorites.includes(id)) {
    // regresa un nuevo arreglo sin el id que viene en el parametro
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }
  // toca guardar de nuevo el local storage los cambios en los poekmons favoritos
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  // sino exist3e el objeto window entonces regresa false
  if (typeof window == "undefined") return false;

  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  // si existe el id regresa un boolean
  return favorites.includes(id);
};

//
const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export { toggleFavorite, existInFavorites, pokemons };
