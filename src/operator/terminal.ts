import l from '../core/logger'
import {
  ParsingExpression,
  ResultOfParsing,
  RawResultOfParsing,
} from '../core/parsing_expression'

export default class Terminal implements ParsingExpression {
  public operator = 'terminal'
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { operator: this.operator, ...result }
  }

  public __Parse(input: string): RawResultOfParsing {
    const success = input.indexOf(this.character) === 0
    const consumed = success ? this.character.length : 0
    return { success, consumed, resultOfChildren: null }
  }
}

export const terminal = (input: string) => new Terminal(input)
