import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpressionClass from '../core/stateless_parsing_expression'

export default class AnyChar extends StatelessParsingExpressionClass {
  public operator = 'anyChar'

  public __Parse(input: string): ResultOfParsing {
    const success = input.length >= 1
    const consumed = success ? 1 : 0
    return { success, consumed, resultOfChild: null }
  }
}

export const anyChar = () => new AnyChar()
