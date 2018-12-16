import {
  ParsingExpression,
  ResultOfParsing,
  RawResultOfParsing,
} from '../core/parsing_expression'
import StatefulParsingExpression from '../core/stateful_parsing_expression'

export default class Choice extends StatefulParsingExpression {
  public operator = 'choice'
  public results: ResultOfParsing[] = []

  public __Parse(index: number, input: string): RawResultOfParsing {
    const result = this.parsingExpressions[index].parse(input)

    this.results.push(result)

    if (result.success === true) {
      this.consumed += result.consumed
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
          success: false,
          consumed: this.consumed,
          resultOfChildren: this.results,
        }
      }
    }
  }
}

export const choice = (parsingExpressions: ParsingExpression[]) =>
  new Choice(parsingExpressions)
