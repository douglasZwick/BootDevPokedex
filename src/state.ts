import { createInterface, type Interface } from "readline";

import { commandExit } from "./commands/exit.js";
import { commandHelp } from "./commands/help.js";
import { commandMap } from "./commands/map.js";
import { commandMapb } from "./commands/mapb.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";


export type State =
{
  rl: Interface;
  commands: Record<string, CliCommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  cache: Cache;
};


export type CliCommand =
{
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
      description: "Prints the next page of locations",
      callback: commandMap,
    },
    mapb:
    {
      name: "mapb",
      description: "Prints the previous page of locations",
      callback: commandMapb,
    },
  };

  const state: State =
  {
    rl: rl,
    commands: commands,
    pokeApi: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
    cache: new Cache(3000),
  };

  return state;
}
