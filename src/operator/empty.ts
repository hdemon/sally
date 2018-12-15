import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class Empty implements ParsingExpression {
  public parse(input: string): ResultOfParsing {
    const success = input === ''
    l({
      input,
      nameOfExpression: 'empty',
      result: { success, consumed: 0 },
    })
    return { success, consumed: 0 }
  }
}

export const empty = () => new Empty()
