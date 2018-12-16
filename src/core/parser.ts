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

    // なぜこうしているかというと、parse自体の成否とparseから呼び出される最初のexpressionの成否は異なりうるので、
    // それぞれを区別してログに残す必要があるから。 TODO: Rewrite it in English later.
    return {
      operator: 'parse',
      success,
      consumed: result.consumed,
      resultOfChildren: [
        {
          operator: this.definitionNameStartFrom,
          success: result.success,
          consumed: result.consumed,
          resultOfChildren: [result],
        },
      ],
    }
  }
}
