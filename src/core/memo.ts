import { ResultOfParsing } from './parsing_expression'

class Memo {
  public memoEntries: {
    [position: number]: {
      [definitionName: string]: ResultOfParsing
    }
  }
  public available = true

  constructor() {
    this.memoEntries = {}
  }

  public storeEntry(
    position: number,
    definitionName: string,
    result: ResultOfParsing
  ): void {
    if (this.available === false) {
      return null
    }

    if (this.memoEntries[position] === undefined) {
      this.memoEntries[position] = {}
    }

    this.memoEntries[position][definitionName] = result
  }

  public getEntry(position: number, definitionName: string): ResultOfParsing {
    if (this.available === false) {
      return null
    }
    if (this.memoEntries[position]) {
      return this.memoEntries[position][definitionName]
    } else {
      return null
    }
  }

  public clear() {
    if (this.available === false) {
      return
    }

    this.memoEntries = {}
  }

  public disable() {
    this.available = false
  }
}

export default new Memo()
