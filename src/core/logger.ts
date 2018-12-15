import c from 'colors/safe'
import { ResultOfParsing } from '../core/parsing_expression'

const log = ({
  input,
  nameOfExpression,
  result,
}: {
  input: string
  nameOfExpression: string
  result: ResultOfParsing
}) => {
  // FIXME: Think the better way to toggle an availability of logging
  if (global.enableLog === true) {
    // tslint:disable-next-line no-console
    console.log(
      `Try to consume ${c.blue(input)} with ${c.cyan(nameOfExpression)} -> ${c[
        result.success ? 'green' : 'red'
      ](result.success ? 'success' : 'fail')} and consumed ${c.green(
        String(result.consumed)
      )} characters`
    )
  }
}

export default log
