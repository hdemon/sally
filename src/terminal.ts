import c from 'colors/safe'
import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class Terminal implements IParsingExpression {
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const success = input.indexOf(this.character) === 0
    l(
      `input: ${c.blue(input)} try to match with: ${c.yellow(
        this.character
      )} -> is terminal? ${
        success ? c.green(String(success)) : c.red(String(success))
      }`
    )
    return { success, consumed: success ? this.character.length : 0 }
  }
}

export const terminal = (input: string) => () => new Terminal(input)
