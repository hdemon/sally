import Choice from '../src/choice'
import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import ParsingExpression from '../src/parsing_expression'
import Terminal from '../src/terminal'

export default class Optional implements NonTerminal {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = () =>
      new Choice([parsingExpression, () => new Empty()])
  }

  public parse(input: string): boolean {
    return this.parsingExpression().parse(input)
  }
}
