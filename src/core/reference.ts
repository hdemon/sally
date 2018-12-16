import c from 'colors/safe'
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
    console.log(
      `Try to parse ${c.blue(input)} as ${c.cyan(this.definitionName)}`
    )
    const result = this.referenceToParser.definitions[
      this.definitionName
    ]().parse(input)
    console.log(
      `The result of parsing ${c.blue(input)} as ${c.cyan(
        this.definitionName
      )} is ${c[result.success ? 'green' : 'red'](
        result.success ? 'succeeded' : 'failed'
      )} and consumed ${c.green(String(result.consumed))} characters`
    )
    return result
  }
}
