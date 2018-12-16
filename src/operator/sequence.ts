import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import StatefulParsingExpression from '../core/stateful_parsing_expression'

export default class Sequence extends StatefulParsingExpression {
  public operator = 'sequence'

  public __Parse(
    index: number,
    input: string,
    offset: number = 0
  ): ResultOfParsing {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpressions[index].parse(stringToTry)

    this.consumed += result.consumed
    if (result.success === true) {
      if (this.parsingExpressions.length === index + 1) {
        return { success: true, consumed: this.consumed, resultOfChild: result }
      } else {
        return this.__Parse(index + 1, input, this.consumed)
      }
    } else {
      return { success: false, consumed: this.consumed, resultOfChild: result }
    }
  }
}

export const sequence = (parsingExpressions: ParsingExpression[]) =>
  new Sequence(parsingExpressions)
