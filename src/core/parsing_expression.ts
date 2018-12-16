export interface ResultOfParsing {
  operator: string
  success: boolean
  consumed: number
  resultOfChildren: ResultOfParsing[]
}

export interface RawResultOfParsing {
  success: boolean
  consumed: number
  resultOfChildren: ResultOfParsing[]
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
