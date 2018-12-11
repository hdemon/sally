import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

const parser = () =>
  new Sequence([() => new Terminal('a'), () => new Terminal('b')])

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(parser().parse('ab')).toEqual(true)
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(parser().parse('AB')).toEqual(false)
})
