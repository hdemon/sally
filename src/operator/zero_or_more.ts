import { choice } from './choice'
import { empty } from './empty'
import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'
import { sequence } from './sequence'

export default class ZeroOrMore implements ParsingExpression {
  private parsingExpression: ParsingExpression
  private consumed: number

  constructor(parsingExpression: ParsingExpression) {
    this.consumed = 0
    this.parsingExpression = parsingExpression
    // this.parsingExpression = choice([
    //   sequence([parsingExpression, zeroOrMore(parsingExpression)]),
    //   empty(),
    // ])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.__Parse(input, 0)
    l({
      input,
      nameOfExpression: 'zero_or_more',
      result,
    })
    return result
  }

  private __Parse(
    input: string,
    offset: number = 0
  ): { success: boolean; consumed: number } {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpression.parse(stringToTry)

    if (result.success === true) {
      this.consumed += result.consumed
      return this.__Parse(input, this.consumed)
    } else {
      return { success: true, consumed: this.consumed }
    }
  }
}

export const zeroOrMore = (parsingExpression: ParsingExpression) =>
  new ZeroOrMore(parsingExpression)
