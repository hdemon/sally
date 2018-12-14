import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'
import { sequence } from './sequence'
import { zeroOrMore } from './zero_or_more'

export default class OneOrMore implements ParsingExpression {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = sequence([
      parsingExpression,
      zeroOrMore(parsingExpression),
    ])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.__Parse(input)
    l({
      input,
      nameOfExpression: 'one_or_more',
      result,
    })
    return result
  }

  public __Parse(input: string): { success: boolean; consumed: number } {
    const result = this.parsingExpression.parse(input)
    return { ...result }
  }
}

export const oneOrMore = (parsingExpression: ParsingExpression) =>
  new OneOrMore(parsingExpression)
