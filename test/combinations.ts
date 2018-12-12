import AndPredicade from '../src/andPredicade'
import Choice from '../src/choice'
import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

let parser: any

beforeEach(() => {
  parser = new Choice([
    () => new Sequence([() => new Terminal('a'), () => new Terminal('b')]),
    () => new Sequence([() => new Terminal('A'), () => new Terminal('B')]),
  ])
})

test('Success cases', () => {
  expect(parser.parse('ab')).toEqual({ success: true, consumed: 2 })
  expect(parser.parse('AB')).toEqual({ success: true, consumed: 2 })

  const parser2 = new Sequence([
    () => new AndPredicade('123'),
    () => new Terminal('123'),
  ])
  expect(parser2.parse('123')).toEqual({
    consumed: 3,
    success: true,
  })
})

test('Failure cases', () => {
  expect(parser.parse('aB')).toEqual({ success: false, consumed: 0 })
})
