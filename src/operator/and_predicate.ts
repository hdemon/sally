import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpressionClass from '../core/stateless_parsing_expression'

export default class AndPredicate extends StatelessParsingExpressionClass {
  public operator = 'andPredicate'

  public __Parse(input: string): ResultOfParsing {
    const result = this.parsingExpression.parse(input)
    const success = result.success
    return { success, consumed: 0, resultOfChild: result }
  }
}

export const andPredicate = (parsingExpression: ParsingExpression) =>
  new AndPredicate(parsingExpression)
