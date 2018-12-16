import Alias from '../core/alias'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
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

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { ...result, operator: this.operator }
  }
}

export const oneOrMore = (parsingExpression: ParsingExpression) =>
  new OneOrMore(parsingExpression)
