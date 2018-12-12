import Terminal from '../src/terminal'
import ZeroOrMore from '../src/zero_or_more'

let parser: any

beforeEach(() => {
  parser = new ZeroOrMore(() => new Terminal('abc'))
})

test('Success cases', () => {
  expect(parser.parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser.parse('abcabc')).toEqual({ success: true, consumed: 6 })
  expect(parser.parse('')).toEqual({ success: true, consumed: 0 })
})

test('Failure cases', () => {
  expect(parser.parse('abcdef')).toEqual({ success: false, consumed: 0 })
  expect(parser.parse('def')).toEqual({ success: false, consumed: 0 })
})