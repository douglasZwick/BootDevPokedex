import { Cache } from "./pokecache.js";


export class PokeAPI
{
  private cache: Cache;
  private static readonly baseUrl = "https://pokeapi.co/api/v2";


  constructor(cache: Cache)
  {
    this.cache = cache;
  }


  async fetchLocations(pageUrl?: string)
  {
    const sectionUrl = "/location-area/";
    const fullUrl = pageUrl || `${PokeAPI.baseUrl}${sectionUrl}`

    return this.fetchHelper<ShallowLocations>(fullUrl);
  }


  async fetchLocation(locationName: string)
  {
    const sectionUrl = "/location-area/";
    const fullUrl = `${PokeAPI.baseUrl}${sectionUrl}${locationName}`;
    
    return this.fetchHelper<LocationData>(fullUrl);
  }


  async fetchPokemon(pokemonName: string)
  {
    const sectionUrl = "/pokemon/";
    const fullUrl = `${PokeAPI.baseUrl}${sectionUrl}${pokemonName}`;

    return this.fetchHelper<Pokemon>(fullUrl);
  }


  async fetchSpecies(pokemonName: string)
  {
    const sectionUrl = "/pokemon-species/";
    const fullUrl = `${PokeAPI.baseUrl}${sectionUrl}${pokemonName}`

    return this.fetchHelper<Species>(fullUrl);
  }


  async fetchHelper<T>(url: string)
  {
    const cached = this.cache.get<T>(url);

    if (cached !== undefined)
      return cached;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data: T = await response.json();
    this.cache.add(url, data);

    return data;
  }
}


type UrlString = string;


export type LocationData =
{
  names: Name[];
  location: Location;
  pokemon_encounters: PokemonEncounter[];
}


type Name =
{
  language: Language;
  name: string;
}


type Language =
{
  name: string;
}


export type Location =
{
  name: string;
  url: UrlString;
}


export type ShallowLocations =
{
  count: number;
  next: UrlString | null;
  previous: UrlString | null;
  results: Location[];
}


export type PokemonEncounter =
{
  pokemon: { name: string; url: string; };
}


export type Pokemon =
{
  name: string;
  species: { name: string, url: UrlString };
}


export type Species =
{
  capture_rate: number;
  names: Name[];
}
