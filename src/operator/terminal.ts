import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class Terminal implements ParsingExpression {
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): ResultOfParsing {
    const success = input.indexOf(this.character) === 0
    const consumed = success ? this.character.length : 0
    l({
      input,
      nameOfExpression: `terminal: ${this.character}`,
      result: { success, consumed },
    })
    return { success, consumed }
  }
}

export const terminal = (input: string) => new Terminal(input)
