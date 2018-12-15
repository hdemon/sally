import { choice } from '../operator/choice'
import { empty } from '../operator/empty'
import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import { sequence } from '../operator/sequence'

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

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input, 0)
    l.traceParsing({
      input,
      nameOfExpression: 'zero_or_more',
      result,
    })
    return result
  }

  private __Parse(input: string, offset: number = 0): ResultOfParsing {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpression.parse(stringToTry)

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
