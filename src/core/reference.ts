import Parser from './parser'
import { ParsingExpression, ResultOfParsing } from './parsing_expression'

export default class Reference implements ParsingExpression {
  public referenceToParser: Parser
  public definitionName: string

  constructor(referenceToParser: Parser, definitionName: string) {
    this.referenceToParser = referenceToParser
    this.definitionName = definitionName
  }

  public parse(input: string): ResultOfParsing {
    const result = this.referenceToParser.definitions[
      this.definitionName
    ]().parse(input)

    return {
      operator: this.definitionName,
      success: result.success,
      consumed: result.consumed,
      resultOfChildren: [result],
    }
  }
}
