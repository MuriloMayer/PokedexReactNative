export interface PokemonApiResponse {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonApiResponse[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

export interface PokemonDetailApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

// Tipos do modelo
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  imageUrl: string;
  stats: {
    name: string;
    value: number;
  }[];
}

export type RootStackParamList = {
  Home: undefined;
  PokemonDetail: {
    pokemon: Pokemon;
  };
  Favorites: undefined;
};

export interface FavoritesContextData {
  favorites: Pokemon[];
  isFavorite: (pokemon: Pokemon) => boolean;
  toggleFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemon: Pokemon) => void;
}