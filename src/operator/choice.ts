import {
  ParsingExpression,
  RawResultOfParsing,
} from '../core/parsing_expression'
import StatefulParsingExpression from '../core/stateful_parsing_expression'

export default class Choice extends StatefulParsingExpression {
  public operator = 'choice'

  public __Parse(index: number, input: string): RawResultOfParsing {
    const result = this.parsingExpressions[index].parse(input)

    this.consumed += result.consumed
    if (result.success === true) {
      return {
        success: true,
        consumed: this.consumed,
        resultOfChildren: [result],
      }
    } else {
      if (index < this.parsingExpressions.length - 1) {
        return this.__Parse(index + 1, input)
      } else {
        return {
          consumed: this.consumed,
          resultOfChildren: [result],
          success: false,
        }
      }
    }
  }
}

export const choice = (parsingExpressions: ParsingExpression[]) =>
  new Choice(parsingExpressions)
