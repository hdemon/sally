import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(new Terminal('1').parse('1')).toEqual(true)
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(new Terminal('A').parse('1')).toEqual(false)
})
