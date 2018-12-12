import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class Empty implements IParsingExpression {
  public parse(input: string): { success: boolean; consumed: number } {
    // it might wrong
    const success = input === ''
    l({
      input,
      nameOfExpression: 'empty',
      result: { success, consumed: 0 },
    })
    return { success, consumed: 0 }
  }
}

export const empty = () => () => new Empty()
