import { describe, expect, test} from "vitest"
import { cleanInput } from "./repl.js";

describe.each(
[
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "\nContains\nnewline\n",
    expected: ["contains", "newline"],
  }
])("cleanInput($input)", ({ input, expected }) =>
{
  test(`Expected: ${expected}`, () =>
  {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected)
      expect(actual[i]).toBe(expected[i]);
  });
});
