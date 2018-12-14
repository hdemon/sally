import c from 'colors/safe'
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
    console.log(`Try to parse as ${c.cyan(this.definitionName)}`)
    const result = this.referenceToParser.definitions[
      this.definitionName
    ]().parse(input)
    console.log(
      `The result of parsing as ${c.cyan(this.definitionName)} is ${c[
        result.success ? 'green' : 'red'
      ](result.success ? 'succeeded' : 'failed')} and consumed ${c.green(
        String(result.consumed)
      )} characters`
    )
    return result
  }
}
