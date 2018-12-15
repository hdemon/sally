import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpressionClass from '../core/stateless_parsing_expression'

export default class Empty extends StatelessParsingExpressionClass {
  public nameOfOperator = 'emptry'

  public __Parse(input: string): ResultOfParsing {
    const success = input === ''
    return { success, consumed: 0 }
  }
}

export const empty = () => new Empty()
