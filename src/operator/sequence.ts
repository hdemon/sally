import c from 'colors/safe'
import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import { terminal } from './terminal'
import StatefulParsingExpression from '../core/stateful_parsing_expression'

export default class Sequence extends StatefulParsingExpression {
  public nameOfOperator = 'sequence'

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
        return { success: true, consumed: this.consumed }
      } else {
        return this.__Parse(index + 1, input, this.consumed)
      }
    } else {
      return { success: false, consumed: this.consumed }
    }
  }
}

export const sequence = (parsingExpressions: ParsingExpression[]) =>
  new Sequence(parsingExpressions)
