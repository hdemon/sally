import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpressionClass from '../core/stateless_parsing_expression'

export default class AnyChar extends StatelessParsingExpressionClass {
  public nameOfOperator = 'anyChar'

  public __Parse(input: string): ResultOfParsing {
    const success = input.length >= 1
    const consumed = success ? 1 : 0
    return { success, consumed }
  }
}

export const anyChar = () => new AnyChar()
