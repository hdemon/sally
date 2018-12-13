import l from '../core/logger'
import {
  IParsingExpression,
  LazyParsingExpression,
} from '../parsing_expression'

export default class Choice implements IParsingExpression {
  private consumed: number
  private lazyParsingExpressions: LazyParsingExpression[]

  constructor(lazyParsingExpressions: LazyParsingExpression[]) {
    this.lazyParsingExpressions = lazyParsingExpressions
  }

  public parse(input: string): { success: boolean; consumed: number } {
    this.consumed = 0
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string
  ): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpressions[index]().parse(input)
    l({ nameOfExpression: 'choice', input, result })
    this.consumed += result.consumed
    if (result.success === true) {
      return { success: true, consumed: this.consumed }
    } else {
      if (index < this.lazyParsingExpressions.length - 1) {
        return this.__Parse(index + 1, input)
      } else {
        return { success: false, consumed: this.consumed }
      }
    }
  }
}

export const choice = (lazyParsingExpressions: LazyParsingExpression[]) => () =>
  new Choice(lazyParsingExpressions)
