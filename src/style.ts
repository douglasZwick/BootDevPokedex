import { InspectColor, styleText } from "node:util";


export class Style
{
  static #enabled = true;


  static Go(format: InspectColor | readonly InspectColor[], text: string)
  {
    return this.#enabled ? styleText(format, text) : text;
  }
}
