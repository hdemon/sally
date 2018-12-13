import { choice } from './choice'
import { empty } from './empty'
import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'
import { sequence } from './sequence'

export default class ZeroOrMore implements ParsingExpression {
  private parsingExpression: ParsingExpression
  private consumed: number

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = parsingExpression
    // this.parsingExpression = choice([
    //   sequence([parsingExpression, zeroOrMore(parsingExpression)]),
    //   empty(),
    // ])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    this.consumed = 0
    return this.__Parse(input, 0)
  }

  private __Parse(
    input: string,
    offset: number = 0
  ): { success: boolean; consumed: number } {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpression.parse(stringToTry)
    l({
      input,
      nameOfExpression: 'zero_or_more',
      result,
    })
    this.consumed += result.consumed

    if (result.success === true) {
      return this.__Parse(input, this.consumed)
    } else {
      return { success: true, consumed: this.consumed }
    }
  }
}

export const zeroOrMore = (parsingExpression: ParsingExpression) =>
  new ZeroOrMore(parsingExpression)
