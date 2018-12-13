import { anyChar } from './any_char'
import l from './logger'
import { notPredicate } from './not_predicate'
import { IParsingExpression, LazyParsingExpression } from './parsing_expression'

export default class EndOfFile implements IParsingExpression {
  private lazyParsingExpression: LazyParsingExpression

  constructor() {
    this.lazyParsingExpression = notPredicate(anyChar())
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.lazyParsingExpression().parse(input)
    l({
      input,
      nameOfExpression: 'end_of_file',
      result,
    })
    return { ...result }
  }
}

export const endOfFile = () => () => new EndOfFile()
