import Optional from '../src/optional'
import Terminal from '../src/terminal'

let parser: any
beforeEach(() => {
  parser = new Optional(() => new Terminal('abc'))
})

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(parser.parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser.parse('')).toEqual({ success: true, consumed: 0 })
  expect(parser.parse('def')).toEqual({ success: false, consumed: 0 })
})
