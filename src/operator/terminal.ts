import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class Terminal implements ParsingExpression {
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    l.traceParsing({
      input,
      nameOfExpression: `terminal: ${this.character}`,
      result: { ...result },
    })
    return result
  }

  public __Parse(input: string): ResultOfParsing {
    const success = input.indexOf(this.character) === 0
    const consumed = success ? this.character.length : 0
    return { success, consumed, resultOfChild: null }
  }
}

export const terminal = (input: string) => new Terminal(input)
