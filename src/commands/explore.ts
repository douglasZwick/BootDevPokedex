import { LocationData } from "src/pokeapi.js";
import { State } from "src/state.js";


export async function commandExplore(state: State, locationName: string)
{
  const cached = state.cache.get(locationName);
  const locationData: LocationData = cached ?? await state.pokeApi.fetchLocation(locationName);

  if (!cached)
  {
    state.cache.add(locationName, locationData);
  }

  const properName = locationData.location.names.find(item => item.language.name === "en")?.name
    ?? locationName;
  let message = `Exploring ${properName}...\nFound Pokémon:\n`;

  for (const encounter of locationData.pokemon_encounters)
    message += `  - ${encounter.pokemon.name}`;

  console.log(message);
}
