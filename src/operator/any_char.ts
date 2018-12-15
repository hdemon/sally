import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class AnyChar implements ParsingExpression {
  public parse(input: string): ResultOfParsing {
    const success = input.length >= 1
    const consumed = success ? 1 : 0
    l({
      input,
      nameOfExpression: 'anyChar',
      result: { success, consumed },
    })
    return { success, consumed }
  }
}

export const anyChar = () => new AnyChar()
