import { commandExit } from "./commands/exit.js";
import { commandHelp } from "./commands/help.js";


export type CliCommand =
{
  name: string;
  description: string;
  callback: (commands: Record<string, CliCommand>) => void;
};


export function getCommands(): Record<string, CliCommand>
{
  return {
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Prints online help",
      callback: commandHelp,
    },
  }
}
