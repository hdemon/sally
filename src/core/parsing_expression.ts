export interface ParsingExpression {
  parse(input: string): { success: boolean; consumed: number }
}

export default ParsingExpression
