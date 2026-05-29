import type { State } from "../state.js";
import { Style } from "../style.js";


export async function commandHelp(state: State)
{
  let message = Style.Go("bold", Style.Go("yellow", "Welcome to the Pokedex!\nUsage:\n\n")); 

  for (const key in state.commands)
  {
    const command = state.commands[key];
    message += `${command.name}: ${command.description}\n`;
  }

  console.log(message);
}
