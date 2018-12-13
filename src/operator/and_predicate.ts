import l from '../core/logger'
import {
  IParsingExpression,
  LazyParsingExpression,
} from '../parsing_expression'

export default class AndPredicate implements IParsingExpression {
  private lazyParsingExpression: LazyParsingExpression

  constructor(lazyParsingExpression: LazyParsingExpression) {
    this.lazyParsingExpression = lazyParsingExpression
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpression().parse(input)
    const success = result.success
    l({
      input,
      nameOfExpression: 'andPredicate',
      result: { success, consumed: 0 },
    })
    return { success, consumed: 0 }
  }
}

export const andPredicate = (
  lazyParsingExpression: LazyParsingExpression
) => () => new AndPredicate(lazyParsingExpression)
