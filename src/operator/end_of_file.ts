import { anyChar } from './any_char'
import l from '../core/logger'
import { notPredicate } from './not_predicate'
import { ParsingExpression } from '../core/parsing_expression'

export default class EndOfFile implements ParsingExpression {
  private parsingExpression: ParsingExpression

  constructor() {
    this.parsingExpression = notPredicate(anyChar())
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.__Parse(input)
    l({
      input,
      nameOfExpression: 'end_of_file',
      result,
    })
    return result
  }

  public __Parse(input: string): { success: boolean; consumed: number } {
    return this.parsingExpression.parse(input)
  }
}

export const endOfFile = () => new EndOfFile()
