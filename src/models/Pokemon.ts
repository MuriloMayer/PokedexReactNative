import {
  PokemonApiResponse,
  PokemonDetailApiResponse,
  Pokemon as IPokemon,
  PokemonDetail as IPokemonDetail,
} from '../types';

export class Pokemon implements IPokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string;

  constructor(data: PokemonApiResponse) {
    this.id = this.extractIdFromUrl(data.url);
    this.name = data.name;
    this.url = data.url;
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(part => part);
    return parseInt(parts[parts.length - 1], 10);
  }
}

export class PokemonDetail implements IPokemonDetail {
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

  constructor(data: PokemonDetailApiResponse) {
    this.id = data.id;
    this.name = data.name;
    this.height = data.height;
    this.weight = data.weight;
    this.types = data.types.map(type => type.type.name);
    this.abilities = data.abilities.map(ability => ability.ability.name);
    this.imageUrl = data.sprites.front_default || '';
    this.stats = data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));
  }
}