import { ParsingExpression } from './parsing_expression'
import Parser from './parser'

export default class Reference implements ParsingExpression {
  public referenceToParser: Parser
  public definitionName: string

  constructor(referenceToParser: Parser, definitionName: string) {
    this.referenceToParser = referenceToParser
    this.definitionName = definitionName
  }

  public parse(input: string): { success: boolean; consumed: number } {
    return this.referenceToParser.definitions[this.definitionName].parse(input)
  }
}
