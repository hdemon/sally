export interface ResultOfParsing {
  success: boolean
  consumed: number
}

export interface ParsingExpression {
  parse(input: string): ResultOfParsing
}

export default ParsingExpression
