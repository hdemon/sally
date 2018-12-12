import Choice from './choice'
import Empty from './empty'
import l from './logger'
import NonTerminal from './non_terminal'
import LazyParsingExpression from './parsing_expression'
import Terminal from './terminal'

export default class Optional implements NonTerminal {
  private parsingExpression: LazyParsingExpression

  constructor(parsingExpression: LazyParsingExpression) {
    this.parsingExpression = () =>
      new Choice([parsingExpression, () => new Empty()])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.parsingExpression().parse(input)
    l(`${input} -> optional? ${result.success}`)
    return { success: result.success, consumed: result.consumed }
  }
}
