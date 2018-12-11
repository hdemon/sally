import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

let parser: any

beforeEach(() => {
  parser = new Sequence([() => new Terminal('abc'), () => new Terminal('def')])
})

test('Success cases', () => {
  expect(parser.parse('abcdef')).toEqual({ success: true, consumed: 6 })
  expect(parser.parse('abcdefghe')).toEqual({ success: true, consumed: 6 })
})

test('Failure cases', () => {
  expect(parser.parse('abcde')).toEqual({ success: false, consumed: 0 })
})
