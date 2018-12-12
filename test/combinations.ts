import { andPredicate } from '../src/andPredicate'
import { choice } from '../src/choice'
import { sequence } from '../src/sequence'
import { terminal } from '../src/terminal'

let parser: any

beforeEach(() => {
  parser = choice([
    sequence([terminal('a'), terminal('b')]),
    sequence([terminal('A'), terminal('B')]),
  ])
})

test('Success cases', () => {
  expect(parser().parse('ab')).toEqual({ success: true, consumed: 2 })
  expect(parser().parse('AB')).toEqual({ success: true, consumed: 2 })

  const parser2 = sequence([andPredicate('123'), terminal('123')])
  expect(parser2().parse('123')).toEqual({
    consumed: 3,
    success: true,
  })
})

test('Failure cases', () => {
  expect(parser().parse('aB')).toEqual({ success: false, consumed: 0 })
})
