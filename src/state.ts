import { createInterface, type Interface } from "readline";
import { handleLine } from "./repl.js";

import { commandExit } from "./commands/exit.js";
import { commandHelp } from "./commands/help.js";


export type State =
{
  rl: Interface;
  commands: Record<string, CliCommand>;
};


export type CliCommand =
{
  name: string;
  description: string;
  callback: (state: State) => void;
};


let stateInitialized = false;
export function initState()
{
  if (stateInitialized) throw new Error("Don't call initState twice");
  stateInitialized = true;

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  
  const commands: Record<string, CliCommand> =
  {
    exit:
    {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    help:
    {
      name: "help",
      description: "Prints online help",
      callback: commandHelp,
    },
  };

  return { rl, commands } as State;
}
