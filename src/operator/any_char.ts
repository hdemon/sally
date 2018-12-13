import l from '../core/logger'
import {
  IParsingExpression,
  LazyParsingExpression,
} from '../parsing_expression'

export default class AnyChar implements IParsingExpression {
  public parse(input: string): { success: boolean; consumed: number } {
    const success = input.length >= 1
    const consumed = input.length ? 1 : 0
    l({
      input,
      nameOfExpression: 'anyChar',
      result: { success, consumed },
    })
    return { success, consumed: input.length ? 1 : 0 }
  }
}

export const anyChar = () => () => new AnyChar()
