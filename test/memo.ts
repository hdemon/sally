import { oneOrMore } from '../src/alias/one_or_more'
import { zeroOrMore } from '../src/alias/zero_or_more'
import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

const p = new Parser()

p.define('expression', () =>
  choice([
    sequence([p.refer('number'), terminal('+'), p.refer('number')]),
    sequence([p.refer('number'), terminal('-'), p.refer('number')]),
  ])
)

p.define('number', () => oneOrMore(p.refer('digit')))
p.define('digit', () =>
  choice([
    terminal('0'),
    terminal('1'),
    terminal('2'),
    terminal('3'),
    terminal('4'),
    terminal('5'),
    terminal('6'),
    terminal('7'),
    terminal('8'),
    terminal('9'),
  ])
)

p.startFrom('expression')

test('Success', () => {
  expect(p.parse('123-4')).toMatchObject({ consumed: 5, success: true })
})
