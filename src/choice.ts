import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import ParsingExpression from '../src/parsing_expression'
import Terminal from '../src/terminal'

export default class Choice implements NonTerminal {
  private parsingExpressions: ParsingExpression[]

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): boolean {
    return this.__Parse(0, input)
  }

  private __Parse(index: number, input: string): boolean {
    const parseResult = this.parsingExpressions[index]().parse(input)
    if (parseResult === true) {
      return true
    } else if (index < this.parsingExpressions.length - 1) {
      return this.__Parse(index + 1, input)
    } else {
      return false
    }
  }
}
