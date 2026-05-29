import { State } from "../state.js";
import { Style } from "../style.js";


type Ball =
{
  type: "Pokéball" | "Great Ball" | "Ultra Ball" | "Master Ball";
  catchValue: number;
}


export async function commandCatch(state: State, pokemonName: string)
{
  const alreadyCaught = pokemonName in state.pokedex;
  
  if (alreadyCaught)
    console.log(Style.Go("italic", "(You know you already have one, right...?)"));

  const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
  const species = await state.pokeApi.fetchSpecies(pokemonName);
  const properName = species.names.find(item => item.language.name === "en")?.name
    ?? pokemonName;
  const coloredName = Style.Go("yellow", properName);

  const ballTypes: Ball[] = [
    { type: "Pokéball", catchValue: 255, },
    { type: "Great Ball", catchValue: 200, },
    { type: "Ultra Ball", catchValue: 150, },
    { type: "Master Ball", catchValue: 0, },
  ];

  const ballRoll = Math.random();
  const ballIndex = Math.floor(ballRoll * ballRoll * ballTypes.length);
  const ball = ballTypes[ballIndex];
  const message = ball.type === "Ultra Ball"
    ? `Throwing an ${ball.type} at ${coloredName}...`
    : `Throwing a ${ball.type} at ${coloredName}...`;

  console.log(Style.Go("bold", Style.Go("blue", message)));

  const rate = species.capture_rate;
  const roll = Math.floor(Math.random() * ball.catchValue);
  const caught = roll < rate;
  console.log(Style.Go("gray", `Capture rate: ${rate} | Roll: ${roll}`));

  if (caught)
  {
    if (!alreadyCaught)
      state.pokedex[pokemonName] = pokemon;
    
    console.log(Style.Go("green", Style.Go("bold", Style.Go("italic", "Gotcha!"))));
    console.log(`${coloredName} was caught!`);

    return;
  }

  console.log(Style.Go("red", Style.Go("bold", Style.Go("italic",
    "Aww! It appeared to be caught!"))));
  console.log(`${coloredName} escaped!`);
}
