import { choice } from './choice'
import { empty } from './empty'
import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class Optional implements IParsingExpression {
  private lazyParsingExpression: LazyParsingExpression

  constructor(lazyParsingExpression: LazyParsingExpression) {
    this.lazyParsingExpression = choice([lazyParsingExpression, empty()])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpression().parse(input)
    l(`${input} -> optional? ${result.success}`)
    return { success: result.success, consumed: result.consumed }
  }
}

export const optional = (lazyParsingExpression: LazyParsingExpression) => () =>
  new Optional(lazyParsingExpression)
