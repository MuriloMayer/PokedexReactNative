export class Pokemon {
  constructor(data) {
    this.id = this.extractIdFromUrl(data.url);
    this.name = data.name;
    this.url = data.url;
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }

  extractIdFromUrl(url) {
    const parts = url.split('/').filter(part => part);
    return parseInt(parts[parts.length - 1]);
  }
}

export class PokemonDetail {
  constructor(data) {
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