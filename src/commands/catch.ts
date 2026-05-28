import { State } from "src/state.js";


export async function commandExplore(state: State, pokemonName: string)
{
  const cached = state.cache.get(pokemonName);
  // const pokemonData: Pokemon = cached ?? await state
}
