import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class Empty implements IParsingExpression {
  public parse(input: string): { success: boolean; consumed: number } {
    // it might wrong
    const success = input === ''
    l(`${input} -> empty? ${success}`)
    return { success, consumed: 0 }
  }
}
