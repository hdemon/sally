import {
  ParsingExpression,
  RawResultOfParsing,
  ResultOfParsing,
} from '../core/parsing_expression'

export default class ZeroOrMore implements ParsingExpression {
  public operator = 'zero_or_more'
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
    // l.traceParsing({
    //   input,
    //   nameOfExpression: 'zero_or_more',
    //   result,
    // })
    return { operator: this.operator, ...result }
  }

  private __Parse(input: string, offset: number = 0): RawResultOfParsing {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpression.parse(stringToTry)

    this.consumed += result.consumed
    if (result.success === true) {
      return this.__Parse(input, this.consumed)
    } else {
      return {
        success: true,
        consumed: this.consumed,
        resultOfChildren: [result],
      }
    }
  }
}

export const zeroOrMore = (parsingExpression: ParsingExpression) =>
  new ZeroOrMore(parsingExpression)
