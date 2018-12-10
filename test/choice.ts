import Choice from '../src/choice'
import Terminal from '../src/terminal'

const parser = new Choice([new Terminal('a'), new Terminal('b')])

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(parser.parse('a')).toEqual(true)
  expect(parser.parse('b')).toEqual(true)
})

test("parse returns false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(parser.parse('c')).toEqual(false)
})
