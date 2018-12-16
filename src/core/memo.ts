import { ResultOfParsing } from './parsing_expression'

class Memo {
  public memoEntries: {
    [position: number]: {
      [definitionName: string]: ResultOfParsing
    }
  }

  constructor() {
    this.memoEntries = {}
  }

  public storeEntry(
    position: number,
    definitionName: string,
    result: ResultOfParsing
  ): void {
    if (this.memoEntries[position] === undefined) {
      this.memoEntries[position] = {}
    }

    this.memoEntries[position][definitionName] = JSON.parse(
      JSON.stringify(result)
    )
  }

  public getEntry(position: number, definitionName: string): ResultOfParsing {
    if (this.memoEntries[position]) {
      return this.memoEntries[position][definitionName]
    } else {
      return null
    }
  }

  public clear() {
    this.memoEntries = {}
  }
}

export default new Memo()
