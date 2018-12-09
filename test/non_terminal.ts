import NonTerminal from '../src/non_terminal'
import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(
    new NonTerminal([new Terminal('a'), new Terminal('b')]).parse('ab')
  ).toEqual(true)
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(
    new NonTerminal([new Terminal('a'), new Terminal('b')]).parse('a1')
  ).toEqual(false)
})
