import axios from 'axios';
import {Pokemon, PokemonDetail} from '../models/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  async getPokemonList(offset = 0, limit = 20) {
    try {
      const response = await axios.get(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      );
      return response.data.results.map(item => new Pokemon(item));
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw new Error('Falha ao carregar Pokémon');
    }
  },

  async getPokemonDetail(nameOrId) {
    try {
      const response = await axios.get(
        `${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`,
      );
      return new PokemonDetail(response.data);
    } catch (error) {
      console.error('Error fetching pokemon detail:', error);
      if (error.response?.status === 404) {
        throw new Error('Pokémon não encontrado');
      }
      throw new Error('Erro ao buscar detalhes do Pokémon');
    }
  },

  async searchPokemon(query) {
    return this.getPokemonDetail(query);
  },
};