import { choice } from './choice'
import { empty } from './empty'
import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class Optional implements ParsingExpression {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
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

  public __Parse(input: string): ResultOfParsing {
    const result = this.parsingExpression.parse(input)

    return { ...result }
  }
}

export const optional = (parsingExpression: ParsingExpression) =>
  new Optional(parsingExpression)
