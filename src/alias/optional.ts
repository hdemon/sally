import l from '../core/logger'
import {
  Alias,
  ParsingExpression,
  RawResultOfParsing,
} from '../core/parsing_expression'
import { choice } from '../operator/choice'
import { empty } from '../operator/empty'

export default class Optional extends Alias {
  public operator = 'Optional'

  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = choice([parsingExpression, empty()])
  }

  public parse(input: string): RawResultOfParsing {
    const result = this.__Parse(input)
    // l.traceParsing({
    //   input,
    //   nameOfExpression: 'optional',
    //   result,
    // })
    return { operator: this.operator, ...result }
  }
}

export const optional = (parsingExpression: ParsingExpression) =>
  new Optional(parsingExpression)
