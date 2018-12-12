import AndPredicade from './andPredicade'
import Choice from './choice'
import Empty from './empty'
import NotPredicade from './notPredicade'
import Optional from './optional'
import Sequence from './sequence'
import Terminal from './terminal'
import ZeroOrMore from './zero_or_more'

export type ParsingExpression =
  | Empty
  | Terminal
  | Sequence
  | Choice
  | Optional
  | ZeroOrMore
  // | OneOrMore
  | AndPredicade
  | NotPredicade

export interface IParsingExpression {
  parse(input: string): { success: boolean; consumed: number }
}

export type LazyParsingExpression = () => ParsingExpression

export default LazyParsingExpression
