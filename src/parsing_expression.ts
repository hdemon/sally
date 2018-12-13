import AndPredicate from './operator/and_predicate'
import Choice from './operator/choice'
import Empty from './operator/empty'
import NotPredicate from './operator/not_predicate'
import Optional from './operator/optional'
import Sequence from './operator/sequence'
import Terminal from './operator/terminal'
import ZeroOrMore from './operator/zero_or_more'

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
