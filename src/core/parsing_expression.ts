export interface ResultOfParsing {
  operator: string
  success: boolean
  consumed: number
  terminal?: string
  resultOfChildren: ResultOfParsing[]
}

export interface RawResultOfParsing {
  success: boolean
  consumed: number
  terminal?: string
  resultOfChildren: ResultOfParsing[]
}
export interface ParsingExpression {
  operator: string
  parse(input: string): ResultOfParsing
}

export default ParsingExpression
