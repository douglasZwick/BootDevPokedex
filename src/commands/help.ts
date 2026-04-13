import type { State } from "src/state.js";


export async function commandHelp(state: State)
{
  let message = "Welcome to the Pokedex!\nUsage:\n\n"; 

  for (const key in state.commands)
  {
    const command = state.commands[key];
    message += `${command.name}: ${command.description}\n`;
  }

  console.log(message);
}
