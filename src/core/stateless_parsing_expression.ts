import {
  ParsingExpression,
  RawResultOfParsing,
  ResultOfParsing,
} from '../core/parsing_expression'

export default abstract class StatelessParsingExpression
  implements ParsingExpression {
  public parsingExpression: ParsingExpression
  public operator: string

  constructor(parsingExpression?: ParsingExpression) {
    this.parsingExpression = parsingExpression
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { operator: this.operator, ...result }
  }

  public abstract __Parse(input: string): RawResultOfParsing
}
