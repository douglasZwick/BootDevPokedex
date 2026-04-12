export class PokeAPI
{
  private static readonly baseUrl = "https://pokeapi.co/api/v2";


  constructor() {}


  async fetchLocations(pageUrl?: string)//: Promise<ShallowLocations>
  {
    const sectionUrl = "/location-area/";
    const fullUrl = `${PokeAPI.baseUrl}${sectionUrl}${pageUrl ?? ""}`;
    
    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const jsonLocations = await response.json();
    return JSON.parse(jsonLocations) as ShallowLocations;
  }


  async fetchLocation(locationName: string)//: Promise<Location>
  {
    const sectionUrl = "/location-area/";
    const fullUrl = `${PokeAPI.baseUrl}${sectionUrl}${locationName}`;

    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const jsonLocation = await response.json();
    return JSON.parse(jsonLocation) as Location;
  }
}


export type ShallowLocations =
{
  locations: Location[];
};


export interface LocationAreaFetchRoot
{
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: Location;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}


export interface EncounterMethodRate
{
  encounter_method: EncounterMethod;
  version_details: any[];
}


export interface EncounterMethod {}


export interface Location
{
  name: string;
  url: string;
}


export interface Name
{
  language: Language;
  name: string;
}


export interface Language {}


export interface PokemonEncounter
{
  pokemon: Pokemon;
  version_details: any[];
}


export interface Pokemon {}


export interface LocationFetchRoot
{
  areas: Area[];
  game_indices: Index[];
  id: number;
  name: string;
  names: Name[];
  region: Region;
}


export interface Area
{
  name: string;
  url: string;
}


export interface Index
{
  game_index: number;
  generation: Generation;
}


export interface Generation {}


export interface Name
{
  language: Language;
  name: string;
}


export interface Language {}


export interface Region
{
  name: string;
  url: string;
}
