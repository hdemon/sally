import l from '../core/logger'
import { ParsingExpression } from './parsing_expression'
import Reference from './reference'

export default class Parser {
  public definitions: { [key: string]: () => ParsingExpression }
  public definitionNameStartFrom: string

  constructor() {
    this.definitions = {}
    this.definitionNameStartFrom = ''
  }

  public startFrom(name: string): void {
    this.definitionNameStartFrom = name
  }

  public define(name: string, callback: () => ParsingExpression): void {
    this.definitions[name] = callback
  }

  public refer(name: string): Reference {
    return new Reference(this, name)
  }

  public parse(input: string): { success: boolean; consumed: number } {
    const result = this.definitions[this.definitionNameStartFrom]().parse(input)
    l({
      input,
      nameOfExpression: 'end_of_file',
      result,
    })
    return result
  }
}
