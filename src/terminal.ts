import c from 'colors/safe'

export default class Terminal {
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const success = input.indexOf(this.character) === 0
    console.log(
      `input: ${c.blue(input)} try to match with: ${c.yellow(
        this.character
      )} -> is terminal? ${
        success ? c.green(String(success)) : c.red(String(success))
      }`
    )
    return { success, consumed: success ? this.character.length : 0 }
  }
}
