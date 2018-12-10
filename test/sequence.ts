import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const result = new Sequence([new Terminal('a'), new Terminal('b')]).parse(
    'ab'
  )
  expect(result).toEqual(true)
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  const result = new Sequence([new Terminal('a'), new Terminal('b')]).parse(
    'a1'
  )
  expect(result).toEqual(false)
})
