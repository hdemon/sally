import { ParsingExpression, RawResultOfParsing } from './parsing_expression'

export class Alias {
  public parsingExpression: ParsingExpression

  public __Parse(input: string): RawResultOfParsing {
    const result = this.parsingExpression.parse(input)
    return {
      success: result.success,
      consumed: result.consumed,
      resultOfChildren: [result],
    }
  }
}

export default Alias
