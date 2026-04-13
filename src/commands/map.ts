import { PokeAPI } from "../pokeapi.js";
import { State } from "../state.js";


export async function commandMap(state: State)
{
  // let message = "";

  await state.pokeApi.fetchLocation("canalave-city");

  // console.log(message);
}
