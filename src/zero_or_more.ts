import Choice from './choice'
import Empty from './empty'
import l from './logger'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'
import Sequence from './sequence'

export default class ZeroOrMore implements IParsingExpression {
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
