import c from 'colors/safe'
import l from '../core/logger'
import {
  IParsingExpression,
  LazyParsingExpression,
} from '../parsing_expression'
import { terminal } from './terminal'

export default class Sequence implements IParsingExpression {
  private lazyParsingExpressions: LazyParsingExpression[]
  private consumed: number

  constructor(lazyParsingExpressions: LazyParsingExpression[]) {
    this.lazyParsingExpressions = lazyParsingExpressions
  }

  public parse(input: string) {
    this.consumed = 0
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string,
    offset: number = 0
  ): { success: boolean; consumed: number } {
    const stringToTry = input.slice(offset)
    const result = this.lazyParsingExpressions[index]().parse(stringToTry)
    l({
      input: stringToTry,
      nameOfExpression: 'sequence',
      result,
    })
    this.consumed += result.consumed

    if (result.success === true) {
      if (this.lazyParsingExpressions.length === index + 1) {
        return { success: true, consumed: this.consumed }
      } else {
        return this.__Parse(index + 1, input, this.consumed)
      }
    } else {
      return { success: false, consumed: this.consumed }
    }
  }
}

export const sequence = (
  lazyParsingExpressions: LazyParsingExpression[]
) => () => new Sequence(lazyParsingExpressions)
