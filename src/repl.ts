import { createInterface, Interface } from "readline";
import { getCommands } from "./CliCommand.js";


export function startREPL()
{
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input) => handleLine(rl, input));
}


export function cleanInput(input: string): string[]
{
  return input.toLowerCase().trim().split(/\s/).filter(s => s.length > 0);
}


function handleLine(rl: Interface, input: string)
{
  const words = cleanInput(input);
  if (words.length <= 0)
  {
    rl.prompt();
    return;
  }

  const commands = getCommands();
  const command = commands[words[0]];
  if (command === undefined)
  {
    console.log("Unknown command");
    rl.prompt();
    return;
  }

  try
  {
    command.callback(commands);
  }
  catch (err)
  {
    if (err instanceof Error)
      console.error(`Error ${err.name} while handling command ${command.name}: ${err.message}`);
    else
      console.error(`Unknown error while handling command ${command.name}: ${err}`);
  }

  rl.prompt();
}
