import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import Terminal from '../src/terminal'
import Choice from './choice'
type ParsingExpression = Terminal | NonTerminal | Empty

export default class Optional implements NonTerminal {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = new Choice([parsingExpression, new Empty()])
  }

  public parse(input: string): boolean {
    return this.parsingExpression.parse(input)
  }
}
