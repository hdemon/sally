import { oneOrMore } from '../src/alias/one_or_more'
import { zeroOrMore } from '../src/alias/zero_or_more'
import Parser from '../src/core/parser'
import Choice, { choice } from '../src/operator/choice'
import Sequence, { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

const p = new Parser()

// The definition below was borrowed from http://d.hatena.ne.jp/hayamiz/20070829/1188368667

p.startFrom('S')
p.define('S', () => p.refer('A'))
p.define('A', () =>
  choice([
    sequence([p.refer('P'), terminal('+'), p.refer('A')]),
    sequence([p.refer('P'), terminal('-'), p.refer('A')]),
    p.refer('P'),
  ])
)

p.define('P', () =>
  choice([
    sequence([
      p.refer('leftParenthesis'),
      p.refer('A'),
      p.refer('rightParenthesis'),
    ]),
    terminal('1'),
  ])
)

test('a', () => {
  expect(p.parse(`(((((((((((((1)))))))))))))`)).toMatchObject({
    consumed: 31,
    success: true,
  })
})
