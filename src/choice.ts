import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class Choice implements IParsingExpression {
  private lazyParsingExpressions: LazyParsingExpression[]

  constructor(lazyParsingExpressions: LazyParsingExpression[]) {
    this.lazyParsingExpressions = lazyParsingExpressions
  }

  public parse(input: string): { success: boolean; consumed: number } {
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string
  ): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpressions[index]().parse(input)
    l({ nameOfExpression: 'choice', input, result })
    if (result.success === true) {
      if (result.consumed === input.length) {
        return { success: true, consumed: result.consumed }
      } else {
        return { success: false, consumed: result.consumed }
      }
    } else {
      if (index < this.lazyParsingExpressions.length - 1) {
        return this.__Parse(index + 1, input)
      } else {
        return { success: false, consumed: result.consumed }
      }
    }
  }
}

export const choice = (lazyParsingExpressions: LazyParsingExpression[]) => () =>
  new Choice(lazyParsingExpressions)
