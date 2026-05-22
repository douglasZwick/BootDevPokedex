export class PokeAPI
{
  private static readonly baseUrl = "https://pokeapi.co/api/v2";


  constructor() {}


  async fetchLocations(pageUrl?: string)//: Promise<ShallowLocations>
  {
    const sectionUrl = "/location-area/";
    const fullUrl = pageUrl || `${PokeAPI.baseUrl}${sectionUrl}`;
    
    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const jsonLocations = await response.json();
    return jsonLocations as ShallowLocations;
  }


  async fetchLocation(locationName: string)//: Promise<Location>
  {
    const sectionUrl = "/location-area/";
    const fullUrl = `${PokeAPI.baseUrl}${sectionUrl}${locationName}`;

    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const jsonLocation = await response.json();
    return jsonLocation as Location;
  }
}


type UrlString = string;


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
