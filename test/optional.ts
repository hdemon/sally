import Optional from '../src/optional'
import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const parser = new Optional(() => new Terminal('a'))

  expect(parser.parse('a')).toEqual(true)
  expect(parser.parse('')).toEqual(true)
  expect(parser.parse('b')).toEqual(false)
})
