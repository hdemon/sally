import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'

export default class Choice implements ParsingExpression {
  private consumed: number
  private parsingExpressions: ParsingExpression[]

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): { success: boolean; consumed: number } {
    this.consumed = 0
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string
  ): { success: boolean; consumed: number } {
    const result = this.parsingExpressions[index].parse(input)
    l({ nameOfExpression: 'choice', input, result })
    this.consumed += result.consumed
    if (result.success === true) {
      return { success: true, consumed: this.consumed }
    } else {
      if (index < this.parsingExpressions.length - 1) {
        return this.__Parse(index + 1, input)
      } else {
        return { success: false, consumed: this.consumed }
      }
    }
  }
}

export const choice = (parsingExpressions: ParsingExpression[]) =>
  new Choice(parsingExpressions)
