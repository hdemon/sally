import Choice from '../src/choice'
import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const result = new Choice([new Terminal('a'), new Terminal('b')]).parse('a')
  expect(result).toEqual(true)
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  const result = new Choice([new Terminal('a'), new Terminal('b')]).parse('b')
  expect(result).toEqual(true)
})

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const result = new Choice([new Terminal('a'), new Terminal('b')]).parse('c')
  expect(result).toEqual(false)
})
