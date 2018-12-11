import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import ParsingExpression from '../src/parsing_expression'
import Terminal from '../src/terminal'

export default class Sequence implements NonTerminal {
  private parsingExpressions: ParsingExpression[]

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): boolean {
    const result = Array.from(input).map(char => {
      return this.__Parse(0, char)
    })
    return result.every(element => element === true)
  }

  private __Parse(index: number, char: string): boolean {
    const parseResult = this.parsingExpressions[index]().parse(char)
    if (parseResult === true) {
      return true
    } else if (index >= this.parsingExpressions.length - 1) {
      return false
    } else {
      return this.__Parse(index + 1, char)
    }
  }
}
