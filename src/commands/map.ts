import { State } from "../state.js";


export async function commandMap(state: State)
{
  const pageUrl = state.nextLocationsURL || undefined;
  const cached = state.cache.get(pageUrl || "");
  const shallowLocations = cached ? cached.val : await state.pokeApi.fetchLocations(pageUrl);

  if (!cached)
  {
    state.cache.add(pageUrl || "", shallowLocations);
  }

  let message = "";

  for (const location of shallowLocations.results)
    message += `${location.name}\n`;

  state.prevLocationsURL = shallowLocations.previous;
  state.nextLocationsURL = shallowLocations.next;
  
  console.log(message);
}
