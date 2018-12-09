export default class Terminal {
  private character: string

  constructor(character: string) {
    this.character = character
  }

  public parse(input: string): boolean {
    return input === this.character
  }
}
