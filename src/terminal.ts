import l from './logger'
import { IParsingExpression } from './parsing_expression'

export default class Terminal implements IParsingExpression {
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const success = input.indexOf(this.character) === 0
    const consumed = success ? this.character.length : 0
    l({
      input,
      nameOfExpression: 'terminal',
      result: { success, consumed },
    })
    return { success, consumed: success ? this.character.length : 0 }
  }
}

export const terminal = (input: string) => () => new Terminal(input)
