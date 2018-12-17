import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { sequence } from '../src/operator/sequence'
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
    sequence([terminal('('), p.refer('A'), terminal(')')]),
    terminal('1'),
  ])
)

test('Parsing too many brackets will take a long time which increases in an exponential fashion without packrat parsing.', () => {
  expect(p.parse(`(((((((((((((1)))))))))))))`)).toMatchObject({
    consumed: 27,
    success: true,
  })
})
