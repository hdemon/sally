import Empty from '../src/empty'
import l from '../src/logger'
import NonTerminal from '../src/non_terminal'
import LazyParsingExpression from '../src/parsing_expression'
import Sequence from '../src/sequence'
import Choice from './choice'

export default class ZeroOrMore implements NonTerminal {
  private parsingExpression: LazyParsingExpression

  constructor(parsingExpression: LazyParsingExpression) {
    this.parsingExpression = () =>
      new Choice([
        () =>
          new Sequence([
            parsingExpression,
            () => new ZeroOrMore(parsingExpression),
          ]),
        () => new Empty(),
      ])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.parsingExpression().parse(input)
    l(`${input} -> zero_or_more? ${result.success}`)
    return { ...result }
  }
}
