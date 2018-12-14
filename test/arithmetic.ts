import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { endOfFile } from '../src/operator/end_of_file'
import { oneOrMore } from '../src/operator/one_or_more'
import { zeroOrMore } from '../src/operator/zero_or_more'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'
global.enableLog = true
const p = new Parser()

p.define('plus', () => terminal('+'))
p.define('minus', () => terminal('-'))
p.define('asterisk', () => terminal('*'))
p.define('slash', () => terminal('/'))
p.define('leftParenthesis', () => terminal('('))
p.define('rightParenthesis', () => terminal(')'))

// Expression
//   = Term (("+" / "-")  Term)*
p.define('expression', () =>
  sequence([
    p.refer('term'),
    zeroOrMore(
      sequence([choice([p.refer('plus'), p.refer('minus')]), p.refer('term')])
    ),
    endOfFile(),
  ])
)

// Term
//   = Factor (("*" / "/")  Factor)*
p.define('term', () =>
  sequence([
    p.refer('factor'),
    zeroOrMore(
      sequence([
        choice([p.refer('asterisk'), p.refer('slash')]),
        p.refer('factor'),
      ])
    ),
  ])
)

// Factor
//   = "(" Expression ")" / Integer
p.define('factor', () =>
  choice([
    sequence([
      p.refer('leftParenthesis'),
      p.refer('expression'),
      p.refer('rightParenthesis'),
    ]),
    p.refer('integer'),
  ])
)
// Integer "integer"
//   = [0-9]+

p.define('integer', () => oneOrMore(p.refer('digit')))
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

test('', () => {
  // expect(p.parse('1')).toEqual({ consumed: 1, success: true })
  expect(p.parse('(1)')).toEqual({ consumed: 3, success: true })
  // expect(p.parse('1')).toEqual({ consumed: 1, success: true })
  // expect(p.parse('1+2')).toEqual({ consumed: 3, success: true })
  // expect(p.parse('(1+2)')).toEqual({ consumed: 5, success: true })
  // expect(p.parse('1*2')).toEqual({ consumed: 3, success: true })
  // expect(p.parse('(1*2)')).toEqual({ consumed: 5, success: true })
  // expect(p.parse('1+2')).toEqual({ consumed: 3, success: true })
})