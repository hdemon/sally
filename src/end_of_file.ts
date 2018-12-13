import { anyChar } from './any_char'
import l from './logger'
import { notPredicate } from './not_predicate'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class Optional implements IParsingExpression {
  private lazyParsingExpression: LazyParsingExpression

  constructor(lazyParsingExpression: LazyParsingExpression) {
    this.lazyParsingExpression = notPredicate(anyChar())
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpression().parse(input)
    l({
      input,
      nameOfExpression: 'optional',
      result,
    })
    return { success: result.success, consumed: result.consumed }
  }
}

export const optional = (lazyParsingExpression: LazyParsingExpression) => () =>
  new Optional(lazyParsingExpression)
