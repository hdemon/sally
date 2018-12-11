import Choice from '../src/choice'
import Terminal from '../src/terminal'

let parser: any

beforeEach(() => {
  parser = new Choice([() => new Terminal('abc'), () => new Terminal('def')])
})

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(parser.parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser.parse('def')).toEqual({ success: true, consumed: 3 })
})

test("parse returns false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(parser.parse('ghi')).toEqual({ success: false, consumed: 0 })
})
