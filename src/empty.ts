import l from '../src/logger'

export default class Empty {
  public parse(input: string): { success: boolean; consumed: number } {
    // it might wrong
    const success = input === ''
    l(`${input} -> empty? ${success}`)
    return { success, consumed: 0 }
  }
}
