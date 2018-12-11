import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

const parser = () =>
  new Sequence([() => new Terminal('abc'), () => new Terminal('def')])

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(parser().parse('abcdef')).toEqual({ success: true, consumed: 6 })
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(parser().parse('abcde')).toEqual({ success: false, consumed: 0 })
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(parser().parse('abcdefghe')).toEqual({ success: true, consumed: 6 })
})
