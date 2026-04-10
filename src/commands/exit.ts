import type { CliCommand } from "../CliCommand.js";


export function commandExit(commands: Record<string, CliCommand>)
{
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}
