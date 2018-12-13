import c from 'colors/safe'
import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class NotPredicate implements IParsingExpression {
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

export const notPredicate = (
  lazyParsingExpression: LazyParsingExpression
) => () => new NotPredicate(lazyParsingExpression)
