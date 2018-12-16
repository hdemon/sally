import Alias from '../core/alias'
import LazyParsingExpression from '../core/lazy_parsing_expression'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import { choice } from '../operator/choice'
import { empty } from '../operator/empty'
import { sequence } from '../operator/sequence'

export default class ZeroOrMore extends Alias {
  public operator = 'zero_or_more'

  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = choice([
      sequence([
        parsingExpression,
        new LazyParsingExpression(() => zeroOrMore(parsingExpression)),
      ]),
      empty(),
    ])
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { ...result, operator: this.operator }
  }
}

export const zeroOrMore = (parsingExpression: ParsingExpression) =>
  new ZeroOrMore(parsingExpression)
