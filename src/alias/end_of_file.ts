import { anyChar } from '../operator/any_char'
import l from '../core/logger'
import { notPredicate } from '../operator/not_predicate'
import {
  ParsingExpression,
  ResultOfParsing,
  Alias,
} from '../core/parsing_expression'

export default class EndOfFile extends Alias {
  constructor() {
    super()
    this.parsingExpression = notPredicate(anyChar())
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    l.traceParsing({
      input,
      nameOfExpression: 'end_of_file',
      result,
    })
    return result
  }
}

export const endOfFile = () => new EndOfFile()
