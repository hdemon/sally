import l from '../core/logger'
import {
  IParsingExpression,
  LazyParsingExpression,
} from '../parsing_expression'
import { sequence } from './sequence'
import { zeroOrMore } from './zero_or_more'

export default class OneOrMore implements IParsingExpression {
  private parsingExpression: LazyParsingExpression

  constructor(lazyParsingExpression: LazyParsingExpression) {
    this.parsingExpression = sequence([
      lazyParsingExpression,
      zeroOrMore(lazyParsingExpression),
    ])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.parsingExpression().parse(input)
    l({
      input,
      nameOfExpression: 'one_or_more',
      result,
    })
    return { ...result }
  }
}

export const oneOrMore = (lazyParsingExpression: LazyParsingExpression) => () =>
  new OneOrMore(lazyParsingExpression)
