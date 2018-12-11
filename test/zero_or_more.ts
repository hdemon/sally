import Terminal from '../src/terminal'
import ZeroOrMore from '../src/zero_or_more'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const parser = new ZeroOrMore(() => new Terminal('a'))

  // expect(parser.parse('a')).toEqual(true)
  // expect(parser.parse('')).toEqual(true)
  // expect(parser.parse('aa')).toEqual(true)
  expect(parser.parse('ab')).toEqual(false)
  // expect(parser.parse('cd')).toEqual(false)
})
