export interface ResultOfParsing {
  operator: string
  success: boolean
  consumed: number
  terminal?: string
  definition?: boolean
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
  definition?: boolean
  parse(input: string): ResultOfParsing
}

export default ParsingExpression
