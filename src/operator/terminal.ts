import {
  ParsingExpression,
  RawResultOfParsing,
  ResultOfParsing,
} from '../core/parsing_expression'

export default class Terminal implements ParsingExpression {
  public operator = 'terminal'

  constructor(character: string) {
    this.character = character
  }
  private character: string

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { operator: this.operator, ...result }
  }

  public __Parse(input: string): RawResultOfParsing {
    const success = input.indexOf(this.character) === 0
    const consumed = success ? this.character.length : 0
    return { success, consumed, terminal: this.character, resultOfChildren: [] }
  }
}

export const terminal = (input: string) => new Terminal(input)
