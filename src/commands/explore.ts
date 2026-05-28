import { styleText } from "node:util";
import { State } from "src/state.js";


export async function commandExplore(state: State, locationName: string)
{
  const locationData = await state.pokeApi.fetchLocation(locationName);
  
  const properName = locationData.names.find(item => item.language.name === "en")?.name
    ?? locationName;
  const styled = styleText("bold", `Exploring ${styleText("yellow", properName)}...`);
  let message = `${styled}\nFound Pokémon:\n`;

  for (const encounter of locationData.pokemon_encounters)
    message += `  - ${encounter.pokemon.name}\n`;

  console.log(message);
}
