import Alias from '../core/alias'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import { choice } from '../operator/choice'
import { empty } from '../operator/empty'

export default class Optional extends Alias {
  public operator = 'Optional'

  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = choice([parsingExpression, empty()])
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    return { ...result, operator: this.operator }
  }
}

export const optional = (parsingExpression: ParsingExpression) =>
  new Optional(parsingExpression)
