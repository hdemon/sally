import { choice } from './choice'
import { empty } from './empty'
import l from '../core/logger'
import {
  IParsingExpression,
  LazyParsingExpression,
} from '../parsing_expression'
import { sequence } from './sequence'

export default class ZeroOrMore implements IParsingExpression {
  private parsingExpression: LazyParsingExpression

  constructor(lazyParsingExpression: LazyParsingExpression) {
    this.parsingExpression = choice([
      sequence([lazyParsingExpression, zeroOrMore(lazyParsingExpression)]),
      empty(),
    ])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.parsingExpression().parse(input)
    l({
      input,
      nameOfExpression: 'zero_or_more',
      result,
    })
    return { ...result }
  }
}

export const zeroOrMore = (
  lazyParsingExpression: LazyParsingExpression
) => () => new ZeroOrMore(lazyParsingExpression)
