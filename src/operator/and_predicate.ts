import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class AndPredicate implements ParsingExpression {
  private parsingExpression: ParsingExpression

  constructor(parsingExpression: ParsingExpression) {
    this.parsingExpression = parsingExpression
  }

  public parse(input: string): ResultOfParsing {
    const result = this.parsingExpression.parse(input)
    const success = result.success
    l({
      input,
      nameOfExpression: 'andPredicate',
      result: { success, consumed: 0 },
    })
    return { success, consumed: 0 }
  }
}

export const andPredicate = (parsingExpression: ParsingExpression) =>
  new AndPredicate(parsingExpression)
