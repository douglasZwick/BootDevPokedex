import { createInterface } from "readline";


export function startREPL(): void
{
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input) =>
  {
    const inputWords = cleanInput(input);
  
    if (inputWords.length <= 0)
    {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${inputWords[0]}`);
    rl.prompt();
  });
}


export function cleanInput(input: string): string[]
{
  return input.toLowerCase().trim().split(/\s/).filter(s => s.length > 0);
}
