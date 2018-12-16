import l from '../core/logger'
import { RawResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpressionClass from '../core/stateless_parsing_expression'

export default class Empty extends StatelessParsingExpressionClass {
  public operator = 'emptry'

  public __Parse(input: string): RawResultOfParsing {
    const success = input === ''
    return { success, consumed: 0, resultOfChildren: null }
  }
}

export const empty = () => new Empty()
