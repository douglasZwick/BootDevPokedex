import type { CliCommand } from "../CliCommand.js";


export function commandHelp(commands: Record<string, CliCommand>)
{
  let message = "Welcome to the Pokedex!\nUsage:\n\n"; 

  for (const key in commands)
  {
    const command = commands[key];
    message += `${command.name}: ${command.description}\n`;
  }

  console.log(message);
}
