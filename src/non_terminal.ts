import Empty from '../src/empty'
import Terminal from '../src/terminal'
type ParsingExpression = Terminal | NonTerminal | Empty

export default class NonTerminal {
  private parsingExpressions: ParsingExpression[]

  constructor(parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): boolean[] {
    const result = Array.from(input).map(char => {
      return this.tryParse(0, char)
    })
    return result
  }

  private tryParse(index: number, char: string): boolean {
    const parseResult = this.parsingExpressions[index].parse(char)
    if (parseResult === true) {
      return true
    } else if (index >= this.parsingExpressions.length - 1) {
      return false
    } else {
      return this.tryParse(index + 1, char)
    }
  }
}
