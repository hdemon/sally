import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import ParsingExpression from '../src/parsing_expression'
import Terminal from '../src/terminal'

export default class Choice implements NonTerminal {
  private parsingExpressions: ParsingExpression[]

  constructor(parsingExpressions: ParsingExpression[]) {
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
      return { success: true, consumed: 0 }
    } else if (index < this.parsingExpressions.length - 1) {
      return this.__Parse(index + 1, input)
    } else {
      return { success: false, consumed: 0 }
    }
  }
}
