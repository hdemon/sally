export default interface NonTerminal {
  parse(input: string): { success: boolean; consumed: number }
}
