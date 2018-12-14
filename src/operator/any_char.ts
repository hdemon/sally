import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'

export default class AnyChar implements ParsingExpression {
  public parse(input: string): { success: boolean; consumed: number } {
    const success = input.length >= 1
    const consumed = input.length ? 1 : 0
    l({
      input,
      nameOfExpression: 'anyChar',
      result: { success, consumed },
    })
    return { success, consumed }
  }
}

export const anyChar = () => new AnyChar()
