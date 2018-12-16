import { ParsingExpression, ResultOfParsing } from '../core/parsing_expression'
import { sequence } from '../operator/sequence'
import { empty } from '../operator/empty'
import { choice } from '../operator/choice'
import LazyParsingExpression from '../core/lazy_parsing_expression'
import Alias from '../core/alias'

export default class ZeroOrMore extends Alias {
  public operator = 'zero_or_more'

  constructor(parsingExpression: ParsingExpression) {
    super()
    this.parsingExpression = choice([
      sequence([
        parsingExpression,
        new LazyParsingExpression(() => zeroOrMore(parsingExpression)),
      ]),
      empty(),
    ])
  }

  public parse(input: string): ResultOfParsing {
    const result = this.__Parse(input)
    // return { operator: this.operator, ...result }
    return {
      operator: this.operator,
      success: result.success,
      consumed: result.consumed,
      resultOfChildren: result.resultOfChildren,
    }
  }
}

export const zeroOrMore = (parsingExpression: ParsingExpression) =>
  new ZeroOrMore(parsingExpression)

// import {
//   ParsingExpression,
//   RawResultOfParsing,
//   ResultOfParsing,
// } from '../core/parsing_expression'

// export default class ZeroOrMore implements ParsingExpression {
//   public operator = 'zero_or_more'
//   private parsingExpression: ParsingExpression
//   private consumed: number
//   public success: boolean[]

//   constructor(parsingExpression: ParsingExpression) {
//     this.consumed = 0
//     this.success = []
//     this.parsingExpression = parsingExpression
//     // this.parsingExpression = choice([
//     //   sequence([parsingExpression, zeroOrMore(parsingExpression)]),
//     //   empty(),
//     // ])
//   }

//   public parse(input: string): ResultOfParsing {
//     const result = this.__Parse(input, 0)
//     // l.traceParsing({
//     //   input,
//     //   nameOfExpression: 'zero_or_more',
//     //   result,
//     // })
//     return { operator: this.operator, ...result }
//   }

//   private __Parse(input: string, offset: number = 0): RawResultOfParsing {
//     const stringToTry = input.slice(offset)
//     const result = this.parsingExpression.parse(stringToTry)

//     this.consumed += result.consumed
//     this.success.push(result.success)

//     if (result.success === true) {
//       return this.__Parse(input, this.consumed)
//     } else {
//       return {
//         success: this.success.some(e => e === true),
//         consumed: this.consumed,
//         resultOfChildren: [result],
//       }
//     }
//   }
// }

// export const zeroOrMore = (parsingExpression: ParsingExpression) =>
//   new ZeroOrMore(parsingExpression)
