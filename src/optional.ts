import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import Terminal from '../src/terminal'
type ParsingExpression = Terminal | NonTerminal | Empty

export default class Optional implements NonTerminal {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = parsingExpression
  }

  public parse(input: string): boolean {
    return this.__Parse(input)
  }

  private __Parse(input: string): boolean {
    const parseResult = this.parsingExpression.parse(input)
    if (parseResult === true) {
      return true
    } else if (input === '') {
      return true
    } else {
      return false
    }
  }
}
