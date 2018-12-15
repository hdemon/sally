import { choice } from '../operator/choice'
import { empty } from '../operator/empty'
import l from '../core/logger'
import {
  ParsingExpression,
  ResultOfParsing,
  Alias,
} from '../core/parsing_expression'

export default class Optional extends Alias {
  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = choice([parsingExpression, empty()])
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    l({
      input,
      nameOfExpression: 'optional',
      result,
    })
    return result
  }
}

export const optional = (parsingExpression: ParsingExpression) =>
  new Optional(parsingExpression)
