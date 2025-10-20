export interface TypeColors {
  [key: string]: string;
}

export const typeColors: TypeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  normal: '#A8A878',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  steel: '#B8B8D0',
};

export const getTypeColor = (type: string): string => {
  return typeColors[type.toLowerCase()] || '#A8A878';
};

export interface Colors {
  primary: string;
  primaryDark: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
}

export const colors: Colors = {
  primary: '#EF5350',
  primaryDark: '#C62828',
  accent: '#FFC107',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
};