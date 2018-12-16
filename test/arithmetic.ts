import { oneOrMore } from '../src/alias/one_or_more'
import { zeroOrMore } from '../src/alias/zero_or_more'
import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

const p = new Parser()

p.define('plus', () => terminal('+'))
p.define('minus', () => terminal('-'))
p.define('asterisk', () => terminal('*'))
p.define('slash', () => terminal('/'))
p.define('leftParenthesis', () => terminal('('))
p.define('rightParenthesis', () => terminal(')'))

p.define('arithmetic', () => p.refer('expression'))

// Expression
//   = Term (("+" / "-")  Term)*
p.define('expression', () =>
  sequence([
    p.refer('term'),
    zeroOrMore(
      sequence([choice([p.refer('plus'), p.refer('minus')]), p.refer('term')])
    ),
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

p.startFrom('arithmetic')

test('Success', () => {
  expect(p.parse('1')).toMatchObject({ consumed: 1, success: true })
  expect(p.parse('(1)')).toMatchObject({ consumed: 3, success: true })
  expect(p.parse('1+2')).toMatchObject({ consumed: 3, success: true })
  expect(p.parse('(1+2)')).toMatchObject({ consumed: 5, success: true })
  expect(p.parse('1*2')).toMatchObject({ consumed: 3, success: true })
  expect(p.parse('(1*2)')).toMatchObject({ consumed: 5, success: true })
  expect(p.parse('(1+(2*3))')).toMatchObject({ consumed: 9, success: true })
  expect(p.parse('(1+(2*3))')).toMatchObject({ consumed: 9, success: true })
  expect(p.parse('(1+(2*3)/4+(5-(6)))')).toMatchObject({
    consumed: 19,
    success: true,
  })
})

test('Failure', () => {
  expect(p.parse('(1')).toMatchObject({ consumed: 0, success: false })
  expect(p.parse('1)')).toMatchObject({ consumed: 1, success: false })
  expect(p.parse('1+')).toMatchObject({ consumed: 1, success: false })
  expect(p.parse('(1+2')).toMatchObject({ consumed: 0, success: false })
  expect(p.parse('1*')).toMatchObject({ consumed: 1, success: false })
  expect(p.parse('1*2)')).toMatchObject({ consumed: 3, success: false })
  expect(p.parse('(1+(2*3)')).toMatchObject({ consumed: 0, success: false })
})
