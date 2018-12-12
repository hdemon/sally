const logger = (text: string) => {
  if (global.enableLog === true) {
    // tslint:disable-next-line no-console
    console.log(text)
  }
}

export default logger
