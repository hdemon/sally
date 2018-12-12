import c from 'colors/safe'
import Empty from '../src/empty'
import l from '../src/logger'
import NonTerminal from '../src/non_terminal'
import LazyParsingExpression from '../src/parsing_expression'
import Terminal from '../src/terminal'

export default class Sequence implements NonTerminal {
  private parsingExpressions: LazyParsingExpression[]
  private consumed: number

  constructor(parsingExpressions: LazyParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
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
    const result = this.parsingExpressions[index]().parse(input.slice(offset))
    l(
      `${input} -> sequence? ${c[result.success ? 'green' : 'red'](
        String(result.success)
      )}`
    )
    this.consumed += result.consumed

    if (result.success === true) {
      if (this.parsingExpressions.length === index + 1) {
        return { success: true, consumed: this.consumed }
      } else {
        return this.__Parse(index + 1, input, result.consumed)
      }
    } else {
      return { success: false, consumed: 0 }
    }
  }
}
