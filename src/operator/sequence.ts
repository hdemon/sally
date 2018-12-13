import c from 'colors/safe'
import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'
import { terminal } from './terminal'

export default class Sequence implements ParsingExpression {
  private parsingExpressions: ParsingExpression[]
  private consumed: number

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string) {
    this.consumed = 0
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string,
    offset: number = 0
  ): { success: boolean; consumed: number } {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpressions[index].parse(stringToTry)
    l({
      input: stringToTry,
      nameOfExpression: 'sequence',
      result,
    })
    this.consumed += result.consumed

    if (result.success === true) {
      if (this.parsingExpressions.length === index + 1) {
        return { success: true, consumed: this.consumed }
      } else {
        return this.__Parse(index + 1, input, this.consumed)
      }
    } else {
      return { success: false, consumed: this.consumed }
    }
  }
}

export const sequence = (lazyParsingExpressions: ParsingExpression[]) =>
  new Sequence(lazyParsingExpressions)
