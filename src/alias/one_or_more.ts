import l from '../core/logger'
import {
  Alias,
  ParsingExpression,
  RawResultOfParsing,
} from '../core/parsing_expression'
import { sequence } from '../operator/sequence'
import { zeroOrMore } from './zero_or_more'

export default class OneOrMore extends Alias {
  public operator = 'one_or_more'

  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = sequence([
      parsingExpression,
      zeroOrMore(parsingExpression),
    ])
  }

  public parse(input: string): RawResultOfParsing {
    const result = this.__Parse(input)
    // l.traceParsing({
    //   input,
    //   nameOfExpression: 'one_or_more',
    //   result,
    // })
    return { operator: this.operator, ...result }
  }
}

export const oneOrMore = (parsingExpression: ParsingExpression) =>
  new OneOrMore(parsingExpression)
