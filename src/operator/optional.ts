import { choice } from './choice'
import { empty } from './empty'
import l from '../core/logger'
import { ParsingExpression } from '../core/parsing_expression'

export default class Optional implements ParsingExpression {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = choice([parsingExpression, empty()])
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.parsingExpression.parse(input)
    l({
      input,
      nameOfExpression: 'optional',
      result,
    })
    return { success: result.success, consumed: result.consumed }
  }
}

export const optional = (parsingExpression: ParsingExpression) =>
  new Optional(parsingExpression)
