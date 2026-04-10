import { initState } from "./state.js";
import { startRepl } from "./repl.js";


function main()
{
  const state = initState();
  startRepl(state);
}


main();
