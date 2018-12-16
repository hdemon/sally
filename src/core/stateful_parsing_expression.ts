import {
  ParsingExpression,
  RawResultOfParsing,
  ResultOfParsing,
} from '../core/parsing_expression'

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
    return { operator: this.operator, ...result }
  }

  public abstract __Parse(index: number, input: string): RawResultOfParsing
}
