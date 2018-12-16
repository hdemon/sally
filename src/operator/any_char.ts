import { RawResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpressionClass from '../core/stateless_parsing_expression'

export default class AnyChar extends StatelessParsingExpressionClass {
  public operator = 'anyChar'

  public __Parse(input: string): RawResultOfParsing {
    const success = input.length >= 1
    const consumed = success ? 1 : 0
    return { success, consumed, resultOfChildren: null }
  }
}

export const anyChar = () => new AnyChar()
