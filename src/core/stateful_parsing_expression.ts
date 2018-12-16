import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default abstract class StatefulParsingExpression
  implements ParsingExpression {
  public parsingExpressions: ParsingExpression[]
  public consumed: number
  public operator: string

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): ResultOfParsing {
    this.consumed = 0
    const result = this.__Parse(0, input)
    l.traceParsing({ nameOfExpression: this.operator, input, result })
    return result
  }

  public abstract __Parse(index: number, input: string): ResultOfParsing
}
