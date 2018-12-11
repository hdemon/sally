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
})

test('Failure cases', () => {
  expect(parser.parse('aB')).toEqual({ success: false, consumed: 0 })
})
