import {
  ParsingExpression,
  RawResultOfParsing,
} from '../core/parsing_expression'
import StatelessParsingExpression from '../core/stateless_parsing_expression'

export default class NotPredicate extends StatelessParsingExpression {
  public nameOfOperator = 'notPredicate'

  public __Parse(input: string): RawResultOfParsing {
    const result = this.parsingExpression.parse(input)
    const success = !result.success
    return { success, consumed: 0, resultOfChildren: [result] }
  }
}

export const notPredicate = (parsingExpression: ParsingExpression) =>
  new NotPredicate(parsingExpression)
