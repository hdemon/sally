import l from '../core/logger'
import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
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

  public define(name: string, getDefinition: () => ParsingExpression): void {
    this.definitions[name] = getDefinition
  }

  public refer(name: string): Reference {
    return new Reference(this, name)
  }

  public parse(input: string): ResultOfParsing {
    const result = this.definitions[this.definitionNameStartFrom]().parse(input)
    const success = result.consumed === input.length && result.success === true
    return { success, consumed: result.consumed, resultOfChild: result }
  }
}
