import Memo from './memo'
import Parser from './parser'
import { ParsingExpression, ResultOfParsing } from './parsing_expression'

export default class Reference implements ParsingExpression {
  public referenceToParser: Parser
  public definitionName: string
  public operator: string

  constructor(referenceToParser: Parser, definitionName: string) {
    this.referenceToParser = referenceToParser
    this.definitionName = definitionName
  }

  public parse(input: string): ResultOfParsing {
    const memoEntry = Memo.getEntry(input.length, this.definitionName)

    // if (memoEntry) {
    //   console.log('Cache hits!')
    //   return memoEntry
    // }

    const result = this.referenceToParser.definitions[
      this.definitionName
    ]().parse(input)

    if (result.success) {
      Memo.storeEntry(input.length, this.definitionName, result)
    }

    return { ...result, operator: this.definitionName }
  }
}
