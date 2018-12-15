export interface ResultOfParsing {
  success: boolean
  consumed: number
}

export interface ParsingExpression {
  parse(input: string): ResultOfParsing
}

export class Alias {
  public parsingExpression: ParsingExpression

  public __Parse(input: string): ResultOfParsing {
    return this.parsingExpression.parse(input)
  }
}

export default ParsingExpression
