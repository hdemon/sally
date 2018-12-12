import c from 'colors/safe'

const logger = ({
  input,
  nameOfExpression,
  result,
}: {
  input: string
  nameOfExpression: string
  result: { success: boolean; consumed: number }
}) => {
  if (global.enableLog === true) {
    // tslint:disable-next-line no-console
    console.log(
      `Try to consume ${c.blue(input)} with ${c.cyan(nameOfExpression)} -> ${c[
        result.success ? 'green' : 'red'
      ](String(result.success))} and consumed ${c.green(
        String(result.consumed)
      )} characters`
    )
  }
}

export default logger
