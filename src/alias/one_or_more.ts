import l from '../core/logger'
import {
  ParsingExpression,
  ResultOfParsing,
  Alias,
} from '../core/parsing_expression'
import { sequence } from '../operator/sequence'
import { zeroOrMore } from './zero_or_more'

export default class OneOrMore extends Alias {
  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = sequence([
      parsingExpression,
      zeroOrMore(parsingExpression),
    ])
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    l({
      input,
      nameOfExpression: 'one_or_more',
      result,
    })
    return result
  }
}

export const oneOrMore = (parsingExpression: ParsingExpression) =>
  new OneOrMore(parsingExpression)
