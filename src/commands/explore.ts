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
  
  const properName = locationData.names.find(item => item.language.name === "en")?.name
    ?? locationName;
  let message = `Exploring ${properName}...\nFound Pokémon:\n`;

  for (const encounter of locationData.pokemon_encounters)
    message += `  - ${encounter.pokemon.name}\n`;

  console.log(message);
}


function printObj(obj: Record<string, unknown>)
{
  let msg = "";
  for (const [key, value] of Object.entries(obj))
    msg += `${key}: ${JSON.stringify(value, null, 2)}\n`;
  console.log(msg);
}


function printObjKeys(obj: Record<string, unknown>)
{
  let msg = "";
  for (const key in obj)
    msg += `${key}\n`;
  console.log(msg);
}
