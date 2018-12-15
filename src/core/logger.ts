import c from 'colors/safe'
import { ResultOfParsing } from '../core/parsing_expression'

class Logger {
  private isAvailable: boolean = false

  traceParsing({
    input,
    nameOfExpression,
    result,
  }: {
    input: string
    nameOfExpression: string
    result: ResultOfParsing
  }): void {
    // FIXME: Think the better way to toggle an availability of logging
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

  enable() {
    this.isAvailable = true
  }

  disable() {
    this.isAvailable = false
  }
}

export default new Logger()
