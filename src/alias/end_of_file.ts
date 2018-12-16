import l from '../core/logger'
import { Alias, ResultOfParsing } from '../core/parsing_expression'
import { anyChar } from '../operator/any_char'
import { notPredicate } from '../operator/not_predicate'

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
