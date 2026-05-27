import { State } from "./state.js";


export async function startRepl(state: State)
{
  state.rl.on("line", async (input) => await handleLine(state, input));
  state.rl.prompt();
}


export function cleanInput(input: string): string[]
{
  return input.toLowerCase().trim().split(/\s/).filter(s => s.length > 0);
}


export async function handleLine(state: State, input: string)
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

  const args = words.slice(1);

  try
  {
    await command.callback(state, ...args);
  }
  catch (err)
  {
    const msg = `while handling command ${command.name} with args [${args}]`;

    if (err instanceof Error)
      console.error(`Error ${err.name} ${msg}: ${err.message}`);
    else
      console.error(`Unknown error ${msg}: ${err}`);
  }

  state.rl.prompt();
}
