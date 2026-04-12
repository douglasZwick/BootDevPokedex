import { createInterface, type Interface } from "readline";

import { commandExit } from "./commands/exit.js";
import { commandHelp } from "./commands/help.js";
import { commandMap } from "./commands/map.js";


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
    map:
    {
      name: "map",
      description: "Fetches a map or something",
      callback: commandMap,
    }
  };

  return { rl, commands } as State;
}
