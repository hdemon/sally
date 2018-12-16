import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default abstract class StatelessParsingExpressionClass
  implements ParsingExpression {
  public parsingExpression: ParsingExpression
  public operator: string

  constructor(parsingExpression?: ParsingExpression) {
    this.parsingExpression = parsingExpression
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    l.traceParsing({ nameOfExpression: this.operator, input, result })
    return result
  }

  public abstract __Parse(input: string): ResultOfParsing
}
