import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'

export default class NotPredicate implements ParsingExpression {
  private lazyParsingExpression: ParsingExpression

  constructor(lazyParsingExpression: ParsingExpression) {
    this.lazyParsingExpression = lazyParsingExpression
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpression.parse(input)
    const success = !result.success
    l({
      input,
      nameOfExpression: 'notPredicate',
      result: { success, consumed: 0 },
    })
    return { success, consumed: 0 }
  }
}

export const notPredicate = (lazyParsingExpression: ParsingExpression) =>
  new NotPredicate(lazyParsingExpression)
