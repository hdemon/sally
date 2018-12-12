import c from 'colors/safe'
import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'
import { terminal } from './terminal'

export default class Sequence implements IParsingExpression {
  private lazyParsingExpressions: LazyParsingExpression[]
  private consumed: number

  constructor(lazyParsingExpressions: LazyParsingExpression[]) {
    this.lazyParsingExpressions = lazyParsingExpressions
  }

  public parse(input: string): { success: boolean; consumed: number } {
    this.consumed = 0
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string,
    offset: number = 0
  ): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpressions[index]().parse(
      input.slice(offset)
    )
    l(
      `${input} -> sequence? ${c[result.success ? 'green' : 'red'](
        String(result.success)
      )}`
    )
    this.consumed += result.consumed

    if (result.success === true) {
      if (this.lazyParsingExpressions.length === index + 1) {
        return { success: true, consumed: this.consumed }
      } else {
        return this.__Parse(index + 1, input, result.consumed)
      }
    } else {
      return { success: false, consumed: 0 }
    }
  }
}

export const sequence = (
  lazyParsingExpresisons: LazyParsingExpression[]
) => () => new Sequence(lazyParsingExpresisons)
