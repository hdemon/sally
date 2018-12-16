import { RawResultOfParsing } from '../core/parsing_expression'
import StatelessParsingExpression from '../core/stateless_parsing_expression'

export default class Empty extends StatelessParsingExpression {
  public operator = 'empty'

  public __Parse(input: string): RawResultOfParsing {
    // Empty means `ε` and it doesn't express no length string ''.
    // It accepts any strings but never consume them.
    return { success: true, consumed: 0, resultOfChildren: [] }
  }
}

export const empty = () => new Empty()
