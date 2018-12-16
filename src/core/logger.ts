import c from 'colors/safe'
import { ResultOfParsing } from '../core/parsing_expression'

class Logger {
  private isAvailable: boolean = false

  public traceParsing({
    input,
    nameOfExpression,
    result,
  }: {
    input: string
    nameOfExpression: string
    result: ResultOfParsing
  }): void {
    if (this.isAvailable === true) {
      // tslint:disable-next-line no-console
      console.log(
        `Try to consume ${c.blue(input)} with ${c.cyan(
          nameOfExpression
        )} -> ${c[result.success ? 'green' : 'red'](
          result.success ? 'success' : 'fail'
        )} and consumed ${c.green(String(result.consumed))} characters`
      )
    }
  }
}

export default new Logger()
