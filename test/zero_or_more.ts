import Terminal from '../src/terminal'
import ZeroOrMore from '../src/zero_or_more'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const parser = new ZeroOrMore(() => new Terminal('abc'))

  expect(parser.parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser.parse('abcabc')).toEqual({ success: true, consumed: 6 })
  expect(parser.parse('abcdef')).toEqual({ success: false, consumed: 0 })
  expect(parser.parse('def')).toEqual({ success: false, consumed: 0 })
  expect(parser.parse('')).toEqual({ success: true, consumed: 0 })
})
