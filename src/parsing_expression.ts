import AndPredicate from './andPredicate'
import Choice from './choice'
import Empty from './empty'
import NotPredicate from './notPredicate'
import { optional } from './optional'
import Sequence from './sequence'
import { terminal } from './terminal'
import ZeroOrMore from './zero_or_more'

export type ParsingExpression =
  | Empty
  | Terminal
  | Sequence
  | Choice
  | Optional
  | ZeroOrMore
  // | OneOrMore
  | AndPredicate
  | NotPredicate

export interface IParsingExpression {
  parse(input: string): { success: boolean; consumed: number }
}

export type LazyParsingExpression = () => ParsingExpression

export default LazyParsingExpression
