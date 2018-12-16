import {
  ParsingExpression,
  ResultOfParsing,
  RawResultOfParsing,
} from '../core/parsing_expression'
import StatefulParsingExpression from '../core/stateful_parsing_expression'

export default class Sequence extends StatefulParsingExpression {
  public operator = 'sequence'
  public results: ResultOfParsing[] = []

  public __Parse(
    index: number,
    input: string,
    offset: number = 0
  ): RawResultOfParsing {
    const stringToTry = input.slice(offset)
    const result = this.parsingExpressions[index].parse(stringToTry)

    this.consumed += result.consumed
    this.results.push(result)

    if (result.success === true) {
      if (this.parsingExpressions.length === index + 1) {
        return {
          success: true,
          consumed: this.consumed,
          resultOfChildren: this.results,
        }
      } else {
        return this.__Parse(index + 1, input, this.consumed)
      }
    } else {
      return {
        success: false,
        consumed: this.consumed,
        resultOfChildren: this.results,
      }
    }
  }
}

export const sequence = (parsingExpressions: ParsingExpression[]) =>
  new Sequence(parsingExpressions)
