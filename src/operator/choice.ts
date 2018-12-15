import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'

export default class Choice implements ParsingExpression {
  public consumed: number
  public parsingExpressions: ParsingExpression[]

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): ResultOfParsing {
    this.consumed = 0
    const result = this.__Parse(0, input)
    l({ nameOfExpression: 'choice', input, result })
    return result
  }

  private __Parse(index: number, input: string): ResultOfParsing {
    const result = this.parsingExpressions[index].parse(input)

    this.consumed += result.consumed
    if (result.success === true) {
      return { success: true, consumed: this.consumed }
    } else {
      if (index < this.parsingExpressions.length - 1) {
        return this.__Parse(index + 1, input)
      } else {
        return { success: false, consumed: this.consumed }
      }
    }
  }
}

export const choice = (parsingExpressions: ParsingExpression[]) =>
  new Choice(parsingExpressions)
