import Terminal from '../src/terminal'
type Empty = ''
type ParsingExpression = Terminal | NonTerminal | Empty

export default class NonTerminal {
  private parsingExpressions: ParsingExpression[]

  constructor(...parsingExpressions: ParsingExpression[]) {
    this.parsingExpressions = parsingExpressions
  }

  public parse(input: string): boolean {
    const result = Array.from(input).map(char => {
      let i = 0
      while (i >= this.parsingExpressions.length - 1) {
        const _result = this.parsingExpressions[i].parse(char)
        if (_result === true) {
          return true
        } else {
          i++
        }
      }
    })
  }
}
