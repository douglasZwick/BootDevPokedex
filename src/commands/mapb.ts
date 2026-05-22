import { State } from "../state.js";


export async function commandMapb(state: State)
{
  let message = "";

  let pageUrl = state.prevLocationsURL;

  if (!pageUrl)
  {
    console.log("You're on the first page.");
    return;
  }

  let shallowLocations = await state.pokeApi.fetchLocations(pageUrl);
  
  for (const location of shallowLocations.results)
    message += `${location.name}\n`;

  state.prevLocationsURL = shallowLocations.previous;
  state.nextLocationsURL = shallowLocations.next;
  
  console.log(message);
}
