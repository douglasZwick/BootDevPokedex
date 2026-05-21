import { PokeAPI } from "../pokeapi.js";
import { State } from "../state.js";


export async function commandMap(state: State)
{
  // let message = "";

  let location = await state.pokeApi.fetchLocation("canalave-city-area");
  // message += `${location.results}`

  printObj(location);
}


function printObj(obj: any): void
{
  for (const key in obj)
  {
    console.log(`${key} : ${obj[key]}`)
  }
}
