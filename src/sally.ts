import Parser from './core/parser'
import Terminal, { terminal } from './operator/terminal'
import AnyChar, { anyChar } from './operator/any_char'
import Sequence, { sequence } from './operator/sequence'
import Choice, { choice } from './operator/choice'
import ZeroOrMore, { zeroOrMore } from './alias/zero_or_more'
import OneOrMore, { oneOrMore } from './alias/one_or_more'
import Optional, { optional } from './alias/optional'
import AndPredicate, { andPredicate } from './operator/and_predicate'
import NotPredicate, { notPredicate } from './operator/not_predicate'
import LazyParsingExpression from './core/lazy_parsing_expression'
import Reference from './core/reference'
import Alias from './core/alias'

const Sally = {
  Parser,
  Terminal,
  AnyChar,
  Sequence,
  Choice,
  ZeroOrMore,
  OneOrMore,
  Optional,
  AndPredicate,
  NotPredicate,
  Alias,
  Reference,
  LazyParsingExpression,

  // aliases
  terminal,
  anyChar,
  sequence,
  choice,
  zeroOrMore,
  oneOrMore,
  optional,
  andPredicate,
  notPredicate,
}

export = Sally
