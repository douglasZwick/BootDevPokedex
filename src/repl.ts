import { State } from "./state.js";


export function startRepl(state: State)
{
  state.rl.on("line", (input) => handleLine(state, input));
  state.rl.prompt();
}


export function cleanInput(input: string): string[]
{
  return input.toLowerCase().trim().split(/\s/).filter(s => s.length > 0);
}


export function handleLine(state: State, input: string)
{
  const words = cleanInput(input);
  if (words.length <= 0)
  {
    state.rl.prompt();
    return;
  }

  const command = state.commands[words[0]];
  if (command === undefined)
  {
    console.log("Unknown command");
    state.rl.prompt();
    return;
  }

  try
  {
    command.callback(state);
  }
  catch (err)
  {
    if (err instanceof Error)
      console.error(`Error ${err.name} while handling command ${command.name}: ${err.message}`);
    else
      console.error(`Unknown error while handling command ${command.name}: ${err}`);
  }

  state.rl.prompt();
}
