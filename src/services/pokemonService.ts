import axios, {AxiosResponse} from 'axios';
import {Pokemon, PokemonDetail} from '../models/Pokemon';
import {
  PokemonListResponse,
  PokemonDetailApiResponse,
  Pokemon as IPokemon,
  PokemonDetail as IPokemonDetail,
} from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonServiceInterface {
  getPokemonList(offset?: number, limit?: number): Promise<IPokemon[]>;
  getPokemonDetail(nameOrId: string | number): Promise<IPokemonDetail>;
  searchPokemon(query: string): Promise<IPokemonDetail>;
}

class PokemonService implements PokemonServiceInterface {
  private allPokemonCache: IPokemon[] | null = null;
  async getPokemonList(offset: number = 0, limit: number = 20): Promise<IPokemon[]> {
    try {
      const response: AxiosResponse<PokemonListResponse> = await axios.get(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      );
      return response.data.results.map(item => new Pokemon(item));
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw new Error('Falha ao carregar Pokémon');
    }
  }

  async getPokemonDetail(nameOrId: string | number): Promise<IPokemonDetail> {
    try {
      const response: AxiosResponse<PokemonDetailApiResponse> = await axios.get(
        `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`,
      );
      return new PokemonDetail(response.data);
    } catch (error: any) {
      console.error('Error fetching pokemon detail:', error);
      if (error.response?.status === 404) {
        throw new Error('Pokémon não encontrado');
      }
      throw new Error('Erro ao buscar detalhes do Pokémon');
    }
  }

  async searchPokemon(query: string): Promise<IPokemonDetail> {
    return this.getPokemonDetail(query);
  }

  /**
   * Fetch all pokemons (cached) and return the list of Pokemon instances.
   * Note: this requests a large limit once and caches the results in memory.
   */
  async getAllPokemonList(): Promise<IPokemon[]> {
    if (this.allPokemonCache) return this.allPokemonCache;
    try {
      const response: AxiosResponse<PokemonListResponse> = await axios.get(
        `${BASE_URL}/pokemon?offset=0&limit=100000`,
      );
      const list = response.data.results.map(item => new Pokemon(item));
      this.allPokemonCache = list;
      return list;
    } catch (error) {
      console.error('Error fetching all pokemon list:', error);
      throw new Error('Falha ao carregar lista de Pokémon');
    }
  }

  /**
   * Search by partial name (case-insensitive) using the cached full list.
   */
  async searchByNamePartial(query: string): Promise<IPokemon[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const all = await this.getAllPokemonList();
    return all.filter(p => p.name.toLowerCase().includes(q));
  }
}

export const pokemonService = new PokemonService();