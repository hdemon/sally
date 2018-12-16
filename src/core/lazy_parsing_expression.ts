import ParsingExpression, {
  RawResultOfParsing,
  ResultOfParsing,
} from '../core/parsing_expression'

export default class LazyParsingExpression {
  public parsingExpression: () => ParsingExpression
  public operator: string

  constructor(lazy: () => ParsingExpression) {
    this.parsingExpression = lazy
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { operator: this.operator, ...result }
  }

  public __Parse(input: string): RawResultOfParsing {
    const parsingExpression = this.parsingExpression()
    this.operator = parsingExpression.operator
    const result = parsingExpression.parse(input)

    return {
      success: result.success,
      consumed: result.consumed,
      resultOfChildren: [result],
    }
  }
}
