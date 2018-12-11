import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import LazyParsingExpression from '../src/parsing_expression'
import Terminal from '../src/terminal'

export default class Choice implements NonTerminal {
  private parsingExpressions: LazyParsingExpression[]

  constructor(parsingExpressions: LazyParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): { success: boolean; consumed: number } {
    return this.__Parse(0, input)
  }

  private __Parse(
    index: number,
    input: string
  ): { success: boolean; consumed: number } {
    const result = this.parsingExpressions[index]().parse(input)
    console.log(`${input} -> choice? ${result}`)
    if (result.success === true) {
      if (result.consumed === input.length) {
        return { success: true, consumed: result.consumed }
      } else {
        return { success: false, consumed: 0 }
      }
    } else {
      if (index < this.parsingExpressions.length - 1) {
        return this.__Parse(index + 1, input)
      } else {
        return { success: false, consumed: 0 }
      }
    }
  }
}
